const Recipient = require('../models/Recipient');
const Invoice = require('../models/Recipient');

module.exports = (req, res, next) => {
    if (req.params.recipientId) {
        const recipientQuery = Recipient.find({
            _id: req.params.recipientId,
            ownerId: req.params.id
        }).countDocuments().exec();
        recipientQuery
            .then(count => {
                console.log(count);
            })
            .catch(err => {
                console.log(err);
            });
    }
};