const express = require('express');

const auth = require('../../middlewares/auth')
const { check, validationResult } = require('express-validator');
const Client = require('../../models/Client');
const router = express.Router();

//@method GET /api/client/:client_id
//desc Pegar cliente por id
router.get('/:client_id', auth, async (req, res) => {
    let { client_id } = req.params
    try {
        const client = await Client.findOne({ _id: client_id });
         if (!client) {
            res.json({ msg: 'Cliente não foi encontrado'});
         }
         res.json(client)
    } catch (err) {
        console.log(err.message)
        res.status(500).send('Server error')
    }
})

//@method GET /api/client
//desc Pegar clientes
router.get('/', auth, async (req, res) => {
  
    try {
         const clients = await Client.find().sort({ date: -1 });
         if (!clients) {
            res.json({ msg: 'Clientes não foram encontrados'});
         }
         res.json(clients)
    } catch (err) {
        console.log(err.message)
        res.status(500).send('Server error')
    }
})

//@method GET /api/client/history/:client_id
//desc Pegar historico do cliente
router.get('/history/:client_id', auth, async (req, res) => {
    const { client_id } = req.params
    try {
         const client = await Client.findOne({ _id: client_id })
         if (!client) {
            res.json({ msg: 'Cliente não foi encontrado'});
         }
         res.json(client.history)
    } catch (err) {
        console.log(err.message)
        res.status(500).send('Server error')
    }
})

//@method POST /api/client
//desc Cadastrar clients
router.post('/', auth, check('name', 'Nome é necessário').notEmpty(), async (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    try {
        const newClient = new Client({
            ...req.body
        })
        await newClient.save();
        res.json(newClient)
    } catch (err) {
        console.log(err.message)
        res.status(500).send('Server error')
    }
})

//@method DELETE /api/client/:client_id
//desc Remover clientes
router.delete('/:client_id', auth, async (req, res) => {
    let { client_id } = req.params
    try {
         await Client.findByIdAndRemove(client_id)
         res.json({msg: 'Cliente removido com sucesso'})
    } catch (err) {
        console.log(err.message)
        res.status(500).send('Server error')
    }
})


//@method PUT /api/client/:client_id
//desc Editar clientes
router.put('/:client_id', auth, async (req, res) => {
    let { client_id } = req.params
    try {
         await Client.findByIdAndUpdate(client_id, req.body);
         const client = await Client.findOne({ _id: client_id });
         if (!client) {
            res.json({ msg: 'Cliente não encontrado'});
         }
         res.json(client)
    } catch (err) {
        console.log(err.message)
        res.status(500).send('Server error')
    }
})

//@method POST /api/client/history/:client_id
//desc Adicionar compra ao historico do cliente
router.post('/history/:client_id', auth, check('balance', 'Balanço total é necessário').notEmpty(),
                check('products', 'Produtos da compra são necessários').notEmpty(), 
   
    async (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    const { client_id } = req.params
    try {
        const client = await Client.findOne({ _id: client_id });
        if (!client) {
            res.json({ msg: 'Cliente não encontrado'});
         }
        const newPurchase = {
            ...req.body
        }
        client.history.unshift(newPurchase);
        await client.save();
        res.json(client.history[0])
    } catch (err) {
        console.log(err.message)
        res.status(500).send('Server error')
    }
})

//@method DELETE /api/client/history/:client_id/:history_id
//desc remover compra do historico do cliente
router.delete('/history/:client_id/:history_id', auth, 
   
    async (req, res) => {

    const { client_id, history_id } = req.params
    try {
        const client = await Client.findOne({ _id: client_id });
        if (!client) {
            res.json({ msg: 'Cliente não encontrado'});
         }
        const purchase = client.history.find(pc => pc.id === history_id);
        if (!purchase) {
            res.json({ msg: 'Compra não encontrada no histórico do cliente'});
         }
        client.history = client.history.filter(pc => pc.id !== history_id)
        await client.save();
        res.json({ msg: 'Compra removida com sucesso do histórico'})
    } catch (err) {
        console.log(err.message)
        res.status(500).send('Server error')
    }
})

//@method POST /api/client/query
//desc Query de clientes por nome
router.post('/query', auth,  async (req, res) => {
    const { name } = req.body
    try {
        const clients = await Client.find({ name: { $regex: `${name}`, $options: "g" }});
        if (!clients) {
            return res.status(400).json({ msg: 'Clientes não foram encontrados para esse nome'})
        } 
        res.json(clients)
    } catch (err) {
        console.log(err.message)
        res.status(500).send('Server error')
    }
})

module.exports = router