const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const passportLocalMongoose = require('passport-local-mongoose');

const UserSchema = new mongoose.Schema({
    email: String,
    salt: String,
    hash: String,
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

UserSchema.plugin(passportLocalMongoose, {
    usernameField: 'email'
    // saltField: 'salt',
    // hashField: 'hash'
});

module.exports = mongoose.model('Users', UserSchema);