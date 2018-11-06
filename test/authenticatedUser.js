const userCredentials = {
    email: 'jimmymcnulty@thewire.com',
    password: 'testPassword',
    firstName: 'Jimmy',
    lastName: 'McNulty',
    displayName: 'Jimmy McNulty'
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