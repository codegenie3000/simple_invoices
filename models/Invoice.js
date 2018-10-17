const mongoose = require('mongoose');

const invoiceSchema = new mongoose.Schema({
    recipientId: {type: Schema.Types.ObjectId, ref: 'Recipient', required: true},
    date: {type: Date, default: Date.now, required: true},
    lineItems: [
        {
            qty: {type: Number, default: 1, required: true},
            type: {type: String, default: '', required: true},
            amount: {type: Number, default: 1, required: true}
        }
    ],
    subTotal: {type: Number, required: true},
    tax: {type: Number, required: true},
    adjustment: {type: Number},
    total: {type: Number, required: true},
    amountPaid: {type: Number},
    balance: {type: Number}
});

module.exports = mongoose.model('Invoices', invoiceSchema);