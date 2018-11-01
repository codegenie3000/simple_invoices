const userCredentials = {
    email: 'me@test.com',
    password: 'testPassword',
    firstName: 'Han',
    lastName: 'Solo',
    displayName: 'Han Solo'
};

module.exports = {
    createUser: function(authenticatedUser, done) { // authenticatedUser is passed from supertest
        authenticatedUser
            .post('/auth/local/signup')
            .set('Accept', 'text/html')
            .send(userCredentials)
            .expect(200)
            .expect('Content-Type', /text/)
            .expect('success', done);
    }
};