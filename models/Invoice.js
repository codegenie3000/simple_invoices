const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const LineItemSubSchema = new mongoose.Schema(
    {
        qty: { type: Number, default: 1, required: true },
        type: { type: String, default: '', required: true },
        amount: { type: Number, default: 1, required: true }
    },
    {
        _id: false
    }
);

const invoiceSchema = new mongoose.Schema({
    recipientId: { type: Schema.Types.ObjectId, ref: 'Recipient' },
    ownerId: { type: Schema.Types.ObjectId, ref: 'User' },
    date: { type: Date, default: Date.now, required: true },
    lineItems: [LineItemSubSchema],
    subTotal: { type: Number, required: true },
    tax: { type: Number, required: true },
    adjustment: { type: Number },
    total: { type: Number, required: true },
    amountPaid: { type: Number },
    balance: { type: Number }
});

module.exports = mongoose.model('Invoice', invoiceSchema);