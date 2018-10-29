const passport = require('passport');

module.exports = (app) => {
    app.get(
        '/auth/google',
        passport.authenticate('google', {
            scope: ['profile', 'email']
        })
    );

    app.get(
        '/auth/google/callback',
        passport.authenticate('google'),
        (req, res) => {
            console.log('logged user in');
            res.redirect('/home');
        }
    );

    app.get('/api/logout', (req, res) => {
        req.logout();
        console.log('logged out');
        res.redirect('/home');
    });

    app.get('/api/current_user', (req, res) => {
        if (req.user) {
            res.send(req.user);
        } else {
            res.send('not logged in');
        }
    });
};