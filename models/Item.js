const mongoose = require('mongoose');


const ItemSchema = new mongoose.Schema({
            
           name: {
                type: String,
                required: true
            },
            
             
          
            pricePerUnit: {
                type: String,
                required: true
            },
            storageAmount: {
                type: Number,
                required: true
            },
            profitUnit: String,
            profitKg: String,
            category: '',
            validity: '',
            weight: String,
  
})

module.exports = Item = mongoose.model('item', ItemSchema)