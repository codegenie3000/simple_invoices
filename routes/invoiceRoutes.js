const requireLogin = require('../middleware/requireLogin');

const mongoose = require('mongoose');
const Invoice = require('../models/Invoice');
const Recipient = require('../models/Recipient');

const checkInvoiceOwnership = require('../middleware/checkOwnership').invoice;
const checkRecipientOwnership = require('../middleware/checkOwnership').recipient;

function convertIdToObjectId(stringId) {
    return mongoose.Types.ObjectId(stringId);
}

//TODO ensure that User owns the recipient before the query is executed

module.exports = app => {
    // get all invoices for a recipient
    app.get('/api/recipients/:recipientId/invoices', requireLogin, checkInvoiceOwnership, (req, res, next) => {
        const recipientId = convertIdToObjectId(req.params.recipientId);
        const invoiceQuery = Invoice.find({ recipientId: recipientId }).exec();
        invoiceQuery.then(invoices => {
            res.status(200).send(invoices);
        });
        invoiceQuery.catch(err => {
            next(err);
        });
    });

    // get one invoice for a recipient
    app.get('/api/recipients/:recipientId/invoices/:invoiceId', requireLogin, (req, res, next) => {
        const { invoiceId, recipientId } = req.params;
        // const recipientId = convertIdToObjectId(req.params.recipientId);
        // console.log(typeof(req.user.id), typeof(recipientId));
        const invoiceQuery = Invoice.findOne({
            _id: convertIdToObjectId(invoiceId)
        })
            .populate('recipientId')
            .exec();
        invoiceQuery.then(invoice => {
            res.send(invoice);
        }).catch(err => {
            next(err)
        });
    });
    // Create/add an invoice for a recipient
    app.post('/api/recipients/:recipientId/invoices', requireLogin, checkRecipientOwnership, (req, res, next) => {
        const { lineItems, subTotal, tax, adjustment, total, amountPaid, balance } = req.body;
        const recipientId = convertIdToObjectId(req.params.recipientId);

        // create new invoice object with recipient Id object
        const newInvoice = new Invoice({
            ownerId: req.user._id,
            recipientId: recipientId,
            date: new Date(),
            lineItems: lineItems,
            subTotal: subTotal,
            tax: tax,
            adjustment: adjustment,
            total: total,
            amountPaid: amountPaid,
            balance: balance
        });

        // save invoice
        const saveInvoice = newInvoice.save();
        saveInvoice
            .then(savedInvoice => {
                // res.send(savedInvoice);
                const savedInvoiceId = savedInvoice._id;
                // push saved invoice Id Object into invoices array inside of Recipient
                Recipient.findOneAndUpdate(
                    {
                        _id: recipientId
                    },
                    {
                        $push: { invoices: { invoiceId: savedInvoiceId } }
                    },
                    { new: true }).exec()
                    .then(updatedRecipient => {
                        res.send(updatedRecipient);
                    })
                    .catch(err => {
                        next(err);
                    });
            })
            .catch(err => {
                next(err);
            });
    });

    // edit an invoice item in an invoice
    app.put('/api/recipients/:recipientId/invoices/:invoiceId', requireLogin, (req, res, next) => {

    });

    // delete an invoice for a recipient

    // add an invoice item to an invoice

    // delete an invoice item in an invoice
};
