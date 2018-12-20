process.env.NODE_ENV = 'test';

const chai = require('chai');
const app = require('../app');
const request = require('supertest');

const authenticatedUser = request.agent(app); //agent enables request to save cookies
const createUser = require('./authenticatedUser').createUser;
const userData = require('./authenticatedUser').userCredentials;
const dropCollection = require('./dbUtilities');

chai.use(request);

describe('Test user not logged in', () => {
    it('tests /api/current_user when user is not logged in', function (done) {
        request(app)
            .get('/api/current_user')
            .expect('Content-Type', /json/)
            .expect(200, {
                isLoggedIn: false
            }, done);
    });
});

describe('Test user account', function () {
    it('creates a user', function (done) {
        createUser(authenticatedUser, done);
    });
    it('test /api/current_user', function (done) {
        authenticatedUser
            .get('/api/current_user')
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect('Content-Type', /json/)
            .expect(200, {
                email: userData.email,
                displayName: userData.displayName,
                recipients: []
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