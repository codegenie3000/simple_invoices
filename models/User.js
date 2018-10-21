const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new mongoose.Schema({
    email: { type: String, required: true },
    googleId: { type: String },
    firstName: { type: String, default: '' },
    lastName: { type: String, default: '' },
    displayName: { type: String, default: '' },
    recipients: [
        {
            recipientId: { type: Schema.Types.ObjectId, ref: 'Recipient', required: true }
        }
    ]
    /*invoices: [
        {
            invoiceId: {type: Schema.Types.ObjectId, ref: 'Invoice', required: true}
        }
    ]*/
});

module.exports = mongoose.model('Users', userSchema);