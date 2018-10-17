const mongoose = require('mongoose');

const recipientSchema = new mongoose.Schema({
    name: {type: String, default: '', required: true},
    email: {type: String, default: '', required: true},
    invoices: [
        {
            invoiceId: {type: Schema.Types.ObjectId, ref: 'Invoice', required: true}
        }
    ]
});

module.exports = mongoose.model('Recipients', recipientSchema);