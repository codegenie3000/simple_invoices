const mongoose = require('mongoose');
const User = require('./models/User');
const Recipient = require('./models/Recipient');
const Invoice = require('./models/Invoice');

const seedDB = () => {
    User.findOne({ email: 'jperalez@gmail.com' }, (err, res) => {
        if (err) {
            console.log(err);
        } else {
            console.log(res);
            const recipient = new Recipient({ ownerId: res.id, name: 'Rick Ku', email: 'jpsother@gmail.com' });
            recipient.save();
        }
    });
};

module.exports = seedDB