const mongoose = require('mongoose');


const ClientSchema = new mongoose.Schema({
       name: {
           type: String,
           required: true
       },
       cpf: String,
       address: String,
       phone: String,
       history: [
           {
               balance: {
                    type: String,
                    required: true 
               },
               products: [
                   {
                    name: String,                   
                    units: String,
                    kgs: String,
                    product_id: String,
                   }
                ],
           
        }
        ],  
        Date: {
            type: Date,
            default: Date.now,
        }          
})

module.exports = Client = mongoose.model('clients', ClientSchema)