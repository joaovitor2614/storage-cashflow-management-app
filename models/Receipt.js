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
            type: String
        },
        forDate: {
            type: String,
            required: true
        },
        paidAt: {
            type: String
        },
        isPaid: {
            type: Boolean,
            default: false
        },
        Date: {
            type: Date,
            default: Date.now,
        }          
})

module.exports = Receipt = mongoose.model('receipts', ReceiptSchema)