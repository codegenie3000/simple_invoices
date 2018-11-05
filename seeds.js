const mongoose = require('mongoose');
const User = require('./models/User');
const Recipient = require('./models/Recipient');
const Invoice = require('./models/Invoice');

const seedDB = () => {
    User.findOne({}, (err, user) => {
        if (!user) {
            let invoiceId,
                recipientId,
                userId;

            const newInvoice = new Invoice({
                lineItems: [
                    {
                        qty: 1,
                        type: 'Development',
                        amount: 100
                    }
                ],
                subTotal: 100,
                tax: 0,
                adjustment: 0,
                total: 100,
                amountPaid: 0,
                balance: 100
            });

            const newRecipient = new Recipient({
                name: 'Rick Ku',
                email: 'rick@email.com',
            });

            const newUser = new User({
                email: 'yoda@email.com',
                firstName: 'R2D2',
                lastName: 'Droid',
                displayName: 'R2D2 Droid'
            });

            recipientId = newRecipient._id;
            invoiceId = newInvoice._id;
            userId = newUser._id;

            newInvoice.recipientId = recipientId;
            newRecipient.invoices = [ { invoiceId: invoiceId } ];
            newRecipient.ownerId = userId;
            newUser.recipients = [ { recipientId: recipientId } ];

            newInvoice.save()
                .then(invoice => {
                    newRecipient.save()
                        .then(recipient => {
                            newUser.save()
                                .then(user => {
                                    console.log('Added seed data');
                                })
                                .catch(err => console.log(err));
                        })
                        .catch(err => console.log(err));
                })
                .catch(err => console.log(err));
        }
        console.log('Data already exists. No records were added');
    });
};

module.exports = seedDB;