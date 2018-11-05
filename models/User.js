const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const passportLocalMongoose = require('passport-local-mongoose');

const UserSchema = new mongoose.Schema({
    email: String,
    salt: String,
    hash: String,
    firstName: String,
    lastName: String,
    displayName: String,
    recipients: [
        {
            recipientId: { type: Schema.Types.ObjectId, ref: 'Recipient' }
        }
    ]
});

UserSchema.plugin(passportLocalMongoose, {
    usernameField: 'email'
});

module.exports = mongoose.model('User', UserSchema);