const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const recipientSchema = new mongoose.Schema({
    ownerId: {type: Schema.Types.ObjectId, ref: 'User', required: true},
    name: {type: String, default: '', required: true},
    email: {type: String, default: '', required: true},
    invoices: [
        {
            invoiceId: {type: Schema.Types.ObjectId, ref: 'Invoice'}
        }
    ]
});

module.exports = mongoose.model('Recipients', recipientSchema);