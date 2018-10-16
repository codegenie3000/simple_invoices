const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    googleId: String,
    firstName: { type: String, default: '' },
    lastName: { type: String, default: '' },
    displayName: { type: String, default: '' }
});

module.exports = mongoose.model('Users', userSchema);