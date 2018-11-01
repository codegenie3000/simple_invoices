process.env.NODE_ENV = 'test';

const chai = require('chai');
const app = require('../app');
const request = require('supertest');

const authenticatedUser = request.agent(app);
const createUser = require('./authenticatedUser').createUser;
const dropCollection = require('./dbUtilities');

chai.use(request);

describe('Test user account', function () {
    before(function(done) {
        createUser(authenticatedUser, done);
    });
    it('should get the current user\'s account', function (done) {
        authenticatedUser
            .get('/api/current_user')
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200, done);
    });
    it('should log a user out', function (done) {
        authenticatedUser
            .get('/api/logout')
            .expect(200)
            .expect('logged out', done);
    });
    after(function (done) {
        // access mongodb native driver and
        // drop collection including indexes
        dropCollection('users', done);
    });
});