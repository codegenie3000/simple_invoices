process.env.NODE_ENV = 'test';

const app = require('../app');
const request = require('supertest');
const expect = require('chai').expect;

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
        // create user
        createUser(authenticatedUser, done);
    });
    before(function (done) {
        // create an invoice recipient
        authenticatedUser
            .post('/api/recipients')
            .set('Accept', 'application/json')
            .send(recipientData.one)
            .expect('Content-Type', /html/)
            .expect(200)
            .end(function (err, res) {
                // console.log(res.body);
                recipientId = res.body;
                done();
            });
    });
    it('POST\'s an invoice', function(done) {
        authenticatedUser
            .post(`/api/recipients/${recipientId}/invoices`)
            .set('Accept', 'application/json')
            .send(invoiceData.one)
            .expect('Content-Type', /html/)
            .expect(200, done);
    });
    it('POST\'s another invoice', function(done) {
        authenticatedUser
            .post(`/api/recipients/${recipientId}/invoices`)
            .set('Accept', 'application/json')
            .send(invoiceData.two)
            .expect('Content-Type', /html/)
            .expect(200, done);
    });
    it('GET\'s all invoices', function(done) {
        authenticatedUser
            .get(`/api/recipients/${recipientId}/invoices`)
            .expect(200)
            .expect('Content-Type', /json/)
            .end(function (err, res) {
                // console.log(res.body);
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
    it('DELETE\'s one invoice', function(done) {
        authenticatedUser
            .delete(`/api/recipients/${recipientId}/invoices/${invoiceId}`)
            .expect(200)
            .expect('Content-Type', /html/, done);
    });
    it('GET\'s all invoices and checks if length is one', function(done) {
        authenticatedUser
            .get(`/api/recipients/${recipientId}/invoices/`)
            .expect(200)
            .expect('Content-Type', /json/)
            .end(function(err, res) {
                expect(res.body).to.have.length(1);
                done();
            });
    });
    after(function (done) {
        dropCollection('users', done, function (err) {
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
                dropCollection('invoices', done, function(err) {
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