const mongoose = require('mongoose');
const { check, validationResult } = require('express-validator/check');
const requireLogin = require('../middleware/requireLogin');
const checkRecipientOwnership = require('../middleware/checkOwnership').recipient;

const Recipient = require('../models/Recipient');
const User = require('../models/User');

function convertIdToObjectId(stringId) {
    return mongoose.Types.ObjectId(stringId);
}

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
    app.get('/api/recipients/:recipientId', requireLogin, checkRecipientOwnership, (req, res, next) => {
        Recipient.findById(req.params.recipientId, (err, recipientsArray) => {
            if (err) {
                next(err);
            } else {
                res.send(recipientsArray);
            }
        });
        /*Recipient.find({
            ownerId: req.user._id,
            _id: req.params.recipientId
        }, (err, recipientsArray) => {
            if (err) {
                next(err);
            } else {
                res.send(recipientsArray);
            }
        });*/
    });

    // create recipient
    app.post('/api/recipients', requireLogin, checkAndSanitize, (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(422).json({ errors: errors.array() });
        }
        // get user's ObjectId
        const userId = req.user._id;

        const recipient = new Recipient({
            ownerId: userId,
            name: req.body.name,
            email: req.body.email
        });
        recipient.save((err, savedRecord) => {
            if (err) {
                console.log(err);
                res.send(err);
            } else {
                const userQuery = User.findOneAndUpdate(
                    {
                        _id: userId,
                    },
                    {
                        $push: {recipients: {recipientId: savedRecord._id}}
                    },
                    {
                        new: true
                    })
                    .exec();
                userQuery
                    .then(user => {
                        // console.log(typeof savedRecord.id);
                        // console.log(typeof savedRecord._id);
                        res.send(savedRecord.id); //send the string Id
                    })
                    .catch(err => {
                        next(err);
                    });
            }
        });

    });

    // update recipient
    app.put('/api/recipients/:recipientId', requireLogin, checkRecipientOwnership, checkAndSanitize, (req, res, next) => {
        // const ownerId = req.user._id;
        const recipientId = req.params.recipientId;

        Recipient.findByIdAndUpdate(recipientId, {
            $set: {
                name: req.body.name,
                email: req.body.email
            }
        }, { new: true }, (err, updatedRecipient) => {
            if (err) {
                next(err);
            }
            res.send(updatedRecipient);
        });

        // find by ID and update
        /*Recipient.findOneAndUpdate(
            {
                id: recipientId
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
        );*/
    });
    // delete recipient
    app.delete('/api/recipients/:recipientId', requireLogin, checkRecipientOwnership, (req, res, next) => {
        const userId = req.user.id;
        const recipientId = convertIdToObjectId(req.params.recipientId);
        const updatedUser = User.findByIdAndUpdate(userId,
            {
                $pull: { recipients: {recipientId: recipientId} }
            },
            {
                new: true
            }).exec();
        updatedUser
            .then(updatedUser => {
                const deletedRecipient = Recipient.findOneAndDelete(recipientId).exec();
                deletedRecipient
                    .then(recipient => {
                        res.send('success');
                    })
                    .catch(err => {
                        next(err);
                    });
            })
            .catch(err => {
                next(err);
            });
        /*(err, updatedUser) => {
            const deletedRecipient = Recipient.findOneAndDelete(recipientId).exec();
            deletedRecipient
                .then(recipient => {
                    res.send(recipient)
                })
                .catch(err => {
                    next(err);
                });
        });*/
        /*const query = Recipient.findByIdAndDelete(req.params.id).exec();
        query.then(doc => {
            res.send(doc);
        })
            .catch(err => res.send(err));*/
    });
};