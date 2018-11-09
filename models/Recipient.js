const mongoose = require('mongoose');
const Schema = mongoose.Schema;

/*const InvoiceSubSchema = new mongoose.Schema(
    {
        invoiceId: {type: Schema.Types.ObjectId, ref: 'Invoice'}
    },
    {
        _id: false
    }
);*/

const recipientSchema = new mongoose.Schema({
    ownerId: { type: Schema.Types.ObjectId, ref: 'User' },
    name: { type: String, default: '', required: true },
    email: { type: String, default: '', required: true },
    invoices: [ mongoose.Schema.Types.ObjectId ]
    // invoices: [InvoiceSubSchema]
});

module.exports = mongoose.model('Recipient', recipientSchema);