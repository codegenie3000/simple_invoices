const Recipient = require('../models/Recipient');
const Invoice = require('../models/Recipient');

const permissionDenied = (count, res, next) => {
    if (count > 0) {
        next();
    } else {
        let err = new Error('You do not have permission to access this resource');
        err.statusCode = 403;
        res.status(err.statusCode).send(err.message);
    }
};

const checkOwnership = {};

checkOwnership.recipient = (req, res, next) => {
    const userObjectId = req.user._id;
    // const recipientId = req.params.recipientId;
    const recipientQuery = Recipient.find({
        ownerId: userObjectId
    }).estimatedDocumentCount().exec();

    recipientQuery
        .then(count => {
            if (count > 0) {
                next();
            } else {
                let err = new Error('Recipient does not exist or you do not have permission to access this resource');
                err.statusCode = 403;
                res.status(err.statusCode).send(err.message);
            }
        })
        .catch(err => {
            next(err);
        });
    /*const userObjectId = req.user._id;
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
        });*/
};

checkOwnership.invoice = (req, res, next) => {
    const userObjectId = req.user._id;
    // const invoiceId = req.params.invoiceId;

    const invoiceQuery = Invoice.find({
        ownerId: userObjectId,
    }).estimatedDocumentCount().exec();

    invoiceQuery.then(count => {
        if (count > 0) {
            next();
        } else {
            let err = new Error('Invoice does not exist or you do not have permission to access this resource');
            err.statusCode = 403;
            res.status(err.statusCode).send(err.message);
        }
    })
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
