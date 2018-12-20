const userCredentials = {
    email: 'jimmymcnulty@thewire.com',
    password: 'testPassword',
    displayName: 'Jimmy McNulty'
};

module.exports = {
    userCredentials: {
        email: 'jimmymcnulty@thewire.com',
        password: 'testPassword',
        displayName: 'Jimmy McNulty'
    },
    createUser: function(authenticatedUser, done) {
        // authenticatedUser is passed from supertest
        authenticatedUser
            .post('/auth/local/signup')
            .set('Accept', 'text/html')
            .send(userCredentials)
            .expect('Content-Type', /json/)
            .expect(200, {
                email: userCredentials.email,
                displayName: userCredentials.displayName,
                recipients: []
            }, done);
    }
};