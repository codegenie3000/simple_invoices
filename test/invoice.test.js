process.env.NODE_ENV = 'test';

const app = require('../app');
const request = require('supertest');

const authenticatedUser = request.agent(app);
const { createUser } = require('./authenticatedUser');
const { recipientData, updatedRecipientData } = require('./testData');
const dropCollection = require('./dbUtilities');

let recipientId;
let invoiceId;

const invoiceData = {
    one: {
        lineItems: [
            {
                qty: 1,
                type: 'Design',
                amount: 80
            }
        ],
        subTotal: 80,
        tax: 0,
        adjustment: 0,
        total: 100,
        amountPaid: 0,
        balance: 80
    },
    two: {
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
    }
};

describe('Test Invoice Routes', function () {
    before(function (done) {
        createUser(authenticatedUser, done);
    });
    it('POST\'s one recipient', function (done) {
        authenticatedUser
            .post('/api/recipients')
            .set('Accept', 'application/json')
            .send(recipientData.one)
            .expect('Content-Type', /json/)
            .expect(200)
            .end(function (err, res) {
                recipientId = res.body._id;
                done();
            });
    });
    it('POST\'s an invoice', function(done) {
        authenticatedUser
            .post(`/api/recipients/${recipientId}/invoices`)
            .set('Accept', 'application/json')
            .send(invoiceData.one)
            .expect('Content-Type', /json/)
            .expect(200)
            .end(function (err, res) {
                done();
            });
    });
    it('POST\'s another invoice', function(done) {
        authenticatedUser
            .post(`/api/recipients/${recipientId}/invoices`)
            .set('Accept', 'application/json')
            .send(invoiceData.two)
            .expect('Content-Type', /json/)
            .expect(200)
            .end(function (err, res) {
                done();
            });
    });
    it('GET\'s all invoices', function(done) {
        authenticatedUser
            .get(`/api/recipients/${recipientId}/invoices`)
            .expect(200)
            .expect('Content-Type', /json/)
            .end(function (err, res) {
                invoiceId = res.body[0]._id;
                done();
            });
    });
    it('GET one invoice', function(done) {
        authenticatedUser
            .get(`/api/recipients/${recipientId}/invoices/${invoiceId}`)
            .expect(200)
            .expect('Content-Type', /json/, done)
    });
    after(function (done) {
        dropCollection('invoices', done, function (err) {
            if (err) {
                console.log(err);
                done();
            }
            console.log('dropped recipient collection');
            dropCollection('recipients', done, function (err) {
                if (err) {
                    console.log(err);
                    done();
                }
                console.log('dropped user collection');
                dropCollection('users', done, function(err) {
                    if (err) {
                        console.log(err);
                        done();
                    }
                    console.log('dropped invoices collection');
                    done();
                });
            });
        });
    });
});