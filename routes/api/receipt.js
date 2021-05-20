const express = require('express');

const auth = require('../../middlewares/auth')
const { check, validationResult } = require('express-validator');
const Receipt = require('../../models/Receipt');
const router = express.Router();

//@method GET /api/receipt/:client_id
//desc Pegar notas por id
router.get('/:receipt_id', auth, async (req, res) => {
    let { receipt_id } = req.params
    try {
        const receipt = await Receipt.findOne({ _id: receipt_id });
         if (!receipt) {
            res.json({ msg: 'Conta a pagar não foi encontrado'});
         }
         res.json(receipt)
    } catch (err) {
        console.log(err.message)
        res.status(500).send('Server error')
    }
})

//@method GET /api/receipt
//desc Pegar notas a pagar
router.get('/', auth, async (req, res) => {
  
    try {
         const receipts = await Receipt.find().sort({ date: -1 });
         if (!receipts) {
            res.json({ msg: 'Nota a pagar não foram encontradas'});
         }
         res.json(receipts)
    } catch (err) {
        console.log(err.message)
        res.status(500).send('Server error')
    }
})

//@method POST /api/receipt
//desc Adicionar notas a pagar
router.post('/', auth, check('value', 'Nome é necessário').notEmpty(),
                        check('description', 'Motivo é necessário').notEmpty(),
                        check('forDate', 'Data de pagamento é necessária').notEmpty(),
                            async (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    try {

        const newReceipt = new Receipt({
            ...req.body
        })
        await newReceipt.save();
        res.json(newReceipt)
    } catch (err) {
        console.log(err.message)
        res.status(500).send('Server error')
    }
})

//@method DELETE /api/receipt/:receipt_id
//desc Remover conta a pagar
router.delete('/:receipt_id', auth, async (req, res) => {
    let { receipt_id } = req.params
    try {
         await Receipt.findByIdAndRemove(receipt_id)
         res.json({msg: 'Conta a pagar removido com sucesso'})
    } catch (err) {
        console.log(err.message)
        res.status(500).send('Server error')
    }
})


//@method PUT /api/client/:client_id
//desc Editar contas a pagar
router.put('/:receipt_id', auth, async (req, res) => {
    let { receipt_id } = req.params
    try {
         await Receipt.findByIdAndUpdate(receipt_id, req.body);
         const receipt = await Receipt.findOne({ _id: receipt_id });
         
         if (!receipt) {
            res.json({ msg: 'Nota a paga não encontrada'});
         }
         res.json(receipt)
    } catch (err) {
        console.log(err.message)
        res.status(500).send('Server error')
    }
})

module.exports = router