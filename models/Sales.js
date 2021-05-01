const mongoose = require('mongoose');


const SalesSchema = new mongoose.Schema({
            
           products: [
                     {
                    name: String,                   
                    units: String,
                    kgs: String,
                    product_id: String,
                 
                }
                
            ],
            
            balance: {
                type: String,
                required: true,
            },
            date: {
                type: Date,
                default: Date.now,
            }
          
          
  
})

module.exports = Sales = mongoose.model('sales', SalesSchema)