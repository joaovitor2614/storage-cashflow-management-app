const express = require('express');

const auth = require('../../middlewares/auth')
const { check, validationResult } = require('express-validator');
const Item = require('../../models/Item');
const router = express.Router();

//@method POST /api/items
//desc Adicionar item/items ao estoque
router.post('/', auth, check('name', 'Nome do item é necessário').notEmpty(),
                      
                       check('pricePerUnit', 'Preço por unidade é necessário')
                       .notEmpty(),
                
                       check('storageAmount', 'Quantidade de unidade a adicionar é necessária e deve ser um número')
                       .notEmpty()
                       .isNumeric('Quantidade de unidade a adicionar deve ser um número'),
                       check('category', 'Categoria é necessária').notEmpty(),
                async (req, res) => {
                    const errors = validationResult(req)
                    if (!errors.isEmpty()) {
                        return res.status(400).json({ errors: errors.array() });
                    }
                                    
                try {
                    const newItem = new Item({
                        originalWeight: req.body.weight,
                        ...req.body
                    })
                    
                    console.log('new Item', newItem)
                    await newItem.save();
                    res.json(newItem)
                } catch (err) {
                    console.log(err.message)
                    res.status(500).send('Server error')
                }
})


//@method GET /api/items
//desc Pegar todos os items
router.get('/', auth, async (req, res) => {
                const items = await Item.find().sort({ date: -1 });
                if (!items) {
                    return res.status(400).json({ msg: 'Items não foram encontrados'})
                }                  
                
                res.json(items)
                try {
                    
                } catch (err) {
                    console.log(err.message)
                    res.status(500).send('Server error')
                }
})

//@method GET /api/items/item/post_id
//desc achar e editar item
router.post('/edit/:item_id', auth, async (req, res) => {
    const { item_id } = req.params
    console.log('item_id', item_id)
   
    try {
        await Item.findByIdAndUpdate(item_id, req.body);
        const item = await Item.findOne({ _id: item_id });

    
        res.json(item)
    } catch (err) {

        console.log(err.message)
        res.status(500).send('Server error')
    }
})

//@method GET /api/items/post_id
//desc achar e remover item
router.delete('/:item_id', auth, async (req, res) => {
    const { item_id } = req.params
    console.log('item_id', item_id)
   
    try {
        await Item.findByIdAndRemove(item_id);
        res.json({ msg: 'Item removido com sucesso'});
    } catch (err) {

        console.log(err.message)
        res.status(500).send('Server error')
    }
})


   

//@method GET /api/items/sales
//desc atualizar estoque após registro devenda
router.post('/sales', auth, async (req, res) => {
    const { products } = req.body;
    
   
    try {
        const items = await Item.find().sort({ date: -1 });
        console.log('items', items)
      
         products.forEach((product) => {
            let soldItem = items.find(item => item._id == product.product_id)
           
            if (soldItem !== undefined) {
                if (product.units !== 0) {
                   
                    soldItem.storageAmount = soldItem.storageAmount -= product.units;
                    console.log('storage amtn after', soldItem.storageAmount)
                    if (soldItem.storageAmount <= 0) {
                            soldItem.remove()
                    } else {
                            soldItem.save();
                    }
                } else if (product.kgs !== 0) {
                    console.log('product ', product)
                    console.log('here weight')
                    let weightNumber = parseFloat(soldItem.weight, 10);
                    let previousWeight = soldItem.originalWeight;
                    soldItem.weight = weightNumber -= product.kgs
                    console.log('weight after', soldItem.weight)
                    if (soldItem.weight <= 0) {
                            if (soldItem.storageAmount == 1) {
                                soldItem.remove()
                            }
                            soldItem.storageAmount--
                            soldItem.weight = previousWeight;
                            soldItem.save();
                    } else {
                            soldItem.save();
                    }
                }
                
              
            }
        })
        res.json({ msg: 'Estoque atualizado'});
    } catch (err) {

        console.log(err.message)
        res.status(500).send('Server error')
    }
})


//@method GET /api/item/name/:product_id
//desc Query de item por nome
router.post('/name', auth, async (req, res) => {
    const { name } = req.body                  
    
    
    try {
        const items = await Item.find({ name: { $regex: `${name}`, $options: "g" }});
        if (!items) {
            return res.status(400).json({ msg: 'Items não foram para com esse nome'})
        } 
        res.json(items)
    } catch (err) {
        console.log(err.message)
        res.status(500).send('Server error')
    }
})


module.exports = router;
