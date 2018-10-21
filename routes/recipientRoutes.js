const mongoose = require('mongoose');
const { check, validationResult } = require('express-validator/check');
const requireLogin = require('../middleware/requireLogin');
const Recipient = require('../models/Recipient');

mongoose.Promise = Promise;

const checkAndSanitize = [
    check('email').not().isEmpty().isEmail().custom(value => {
        return Recipient.find({
            email: value
        }).limit(1).then(userArr => {
            if (userArr.length > 0) {
                return Promise.reject('email already registered')
            }
        })
    }).normalizeEmail(),
    check('name').not().isEmpty().trim()
];

module.exports = app => {
    // list all recipients (index)
    app.get('/api/recipients', requireLogin, (req, res, next) => {
        // get userId from
        const userId = req.user.id;

        // find and return recipients
        Recipient.find({ ownerId: userId }, (err, recipients) => {
            if (err) {
                next(err);
            } else {
                res.send(recipients);
            }
        });
    });

    // one recipient (show)
    app.get('/api/recipients/:id', requireLogin, (req, res, next) => {
        Recipient.find({
            ownerId: req.user.id,
            _id: req.params.id
        }, (err, recipientsArray) => {
            if (err) {
                next(err);
            } else {
                res.send(recipientsArray);
            }
        });
    });

    // create recipient
    app.post('/api/recipients', requireLogin, checkAndSanitize, (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(422).json({ errors: errors.array() });
        }
        // get userId
        const userId = req.user.id;
        // create objectID for recipient
        const recipientId = mongoose.Types.ObjectId();

        const recipient = new Recipient({
            id: recipientId,
            ownerId: userId,
            name: req.body.name,
            email: req.body.email
        });
        recipient.save((err, savedRecord) => {
            if (err) {
                console.log(err);
                res.send(err);
            } else {
                res.send(savedRecord);
            }
        });

    });

    // update recipient
    app.put('/api/recipients/:id', requireLogin, checkAndSanitize, (req, res) => {
        const userId = req.user.id;
        const recipientId = req.params.id;

        // find by ID and update
        Recipient.findOneAndUpdate(
            {
                ownerId: userId,
                _id: recipientId,
            },
            {
                $set: {
                    name: req.body.name,
                    email: req.body.email
                }
            },
            // Returns modified document, not the original
            {
                new: true
            },
            (err, recipient) => {
                if (err) {
                    res.send(err);
                } else {
                    res.send(recipient);
                }
            }
        );
    });
    // delete recipient
    app.delete('/api/recipients/:id', requireLogin, (req, res) => {
        const query = Recipient.findByIdAndDelete(req.params.id).exec();
        query.then(doc => {
            res.send(doc);
        })
            .catch(err => res.send(err));
    });
};