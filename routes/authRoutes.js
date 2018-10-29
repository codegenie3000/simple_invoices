const passport = require('passport');
const User = require('../models/User');

module.exports = (app) => {
    // passport-local signup
    app.post('/auth/local/signup', (req, res) => {
        const NewUser = new User({'email': req.body.email});
        User.register(NewUser, req.body.password, (err, account) => {
            if (err) {
                res.send(err);
            }
            passport.authenticate('local')(req, res, () => {
                res.send('successfully logged in');
            });
        });
    });
    
    app.post('/auth/local/login', passport.authenticate('local'), (req, res) => {
        res.send('successfully logged in');
    });

    app.get('/api/logout', (req, res) => {
        req.logout();
        console.log('logged out');
        res.status(200).send('logged out');
    });

    app.get('/api/current_user', (req, res) => {
        if (req.user) {
            res.send(req.user);
        } else {
            res.send('not logged in');
        }
    });
};