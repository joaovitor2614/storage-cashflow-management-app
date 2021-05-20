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

module.exports = router