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
            .expect(200, {
                userSignedIn: true
            }, done);
            /*.expect('Content-Type', /text/)
            .expect('success')
            .end(() => {
                console.log('added user');
                done();
            });*/
    }
};