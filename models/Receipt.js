const mongoose = require('mongoose');


const ReceiptSchema = new mongoose.Schema({
        value: {
            type: mongoose.Decimal128,
            required: true
        },
        description: {
            type: String,
            required: true,
        },
        editedAt: {
            type: Date
        },
        forDate: {
            type: Date,
            required: true
        },
        Date: {
            type: Date,
            default: Date.now,
        }          
})

module.exports = Receipt = mongoose.model('receipts', ReceiptSchema)