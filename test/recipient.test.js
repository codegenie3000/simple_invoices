process.env.NODE_ENV = 'test';

// const mongoose = require('mongoose');
// const chai = require('chai');
// chai.use(request);
const app = require('../app');
const request = require('supertest');

const authenticatedUser = request.agent(app);
const createUser = require('./authenticatedUser').createUser;
const dropCollection = require('./dbUtilities');
const {recipientData, updatedRecipientData} = require('./testData');

/*const recipientData = {
    one: {
        name: 'Luke Skywalker',
        email: 'luke@skywalker.com'
    },
    two: {
        name: 'Anakin Skywalker',
        email: 'darth@vader.com'
    }
};

const updatedRecipientData = {
    name: 'Darth Vader',
    email: 'darth@vader.com'
};*/

let recipientOneId;

describe('Test Recipient Routes', function () {
    before(function (done) {
        createUser(authenticatedUser, done);
    });
    it('POST\'s one recipient', function (done) {
        authenticatedUser
            .post('/api/recipients')
            .set('Accept', 'application/json')
            .send(recipientData.one)
            .expect('Content-Type', /html/)
            .expect(200, done);
    });
    it('POST\'s another recipient', function (done) {
        authenticatedUser
            .post('/api/recipients')
            .set('Accept', 'application/json')
            .send(recipientData.two)
            .expect('Content-Type', /html/)
            .expect(200, done);
    });
    it('GET all recipients', function (done) {
        authenticatedUser
            .get('/api/recipients')
            // .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200)
            .end(function(err, res) {
                recipientOneId = res.body[0]._id;
                done();
            });
    });
    it('GET one recipient', function(done) {
        authenticatedUser
            .get(`/api/recipients/${recipientOneId}`)
            .expect(200)
            .expect('Content-Type', /json/, done);
    });
    it('UPDATES one recipient', function(done) {
        authenticatedUser
            .put(`/api/recipients/${recipientOneId}`)
            .set('Accept', 'application/json')
            .send(updatedRecipientData)
            .expect(200)
            .expect('Content-Type', /json/, done)
    });
    it('DELETES one recipient', function(done) {
        authenticatedUser
            .delete(`/api/recipients/${recipientOneId}`)
            // .set('Accept', 'application/json')
            .expect(200)
            .expect('Content-Type', /text/, done)
    });
    after(function (done) {
        dropCollection('recipients', done, function(err) {
            if (err) {
                console.log(err);
                done();
            }
            console.log('dropped recipient collection');
            dropCollection('users', done, function(err) {
                if (err) {
                    console.log(err);
                    done();
                }
                console.log('dropped users collection');
                done();
            });
        });
    });
});