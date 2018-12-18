process.env.NODE_ENV = 'test';

const chai = require('chai');
const app = require('../app');
const request = require('supertest');

const authenticatedUser = request.agent(app);
const createUser = require('./authenticatedUser').createUser;
const userData = require('./authenticatedUser').userCredentials;
const dropCollection = require('./dbUtilities');

chai.use(request);

describe('Test user account', function () {
    it('creates a user', function (done) {
        createUser(authenticatedUser, done);
    });
    it('test /api/current_user', function (done) {
        authenticatedUser
            .get('/api/current_user')
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200)
            .expect(function (res) {
                res.body.email = userData.email;
                res.displayName = userData.displayName;
                res.recipients = [];
            })
            .end(function (err, res) {
                if (err) return done(err);
                done();
            });
    });
    it('test /api/logout', function (done) {
        authenticatedUser
            .get('/api/logout')
            .expect('Content-Type', /json/)
            .expect(200, {
                userSignedIn: false
            }, done)
        // .expect('logged out', done);
    });
    after(function (done) {
        // access mongodb native driver and
        // drop collection including indexes
        dropCollection('users', done, function () {
            console.log('dropped users collection');
            done();
        });
    });
});