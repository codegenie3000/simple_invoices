const Recipient = require('../models/Recipient');
const Invoice = require('../models/Recipient');

const checkOwnership = {};

checkOwnership.recipientId = (req, res, next) => {
    const userObjectId = req.user._id;
    const recipientId = req.params.recipientId;

    const recipientQuery = Recipient.find({
        ownerId: userObjectId,
        _id: recipientId
    }).estimatedDocumentCount().exec();

    recipientQuery
        .then(count => {
            if (count > 0) {
                next();
            } else {
                let err = new Error('You do not have permission to access this resource');
                err.statusCode = 403;
                res.status(err.statusCode).send(err.message);
            }
        });
};

checkOwnership.invoiceId = (req, res, next) => {
    const userObjectId = req.user._id;
    const invoiceId = req.params.invoiceId;

    const invoiceQuery = Invoice.find({
        ownerId: userObjectId,
        _id: invoiceId
    }).estimatedDocumentCount().exec();


};

module.exports = checkOwnership;

/*
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
};*/
