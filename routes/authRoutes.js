const passport = require('passport');
const User = require('../models/User');

module.exports = (app) => {
    // passport-local signup
    app.post('/auth/local/signup', (req, res) => {
        const {email, displayName} = req.body;
        const NewUser = new User({
            email: email,
            displayName: displayName
        });
        User.register(NewUser, req.body.password, (err, account) => {
            if (err) {
                res.send(err);
            }
            passport.authenticate('local')(req, res, () => {
                res.status(200).send({userSignedIn: true});
            });
        });
    });
    
    app.post('/auth/local/login', passport.authenticate('local'), (req, res) => {
        res.send({userSignedIn: true});
    });

    app.get('/api/logout', (req, res) => {
        req.logout();
        console.log('logged out');
        res.status(200).send({userSignedIn: false});
    });

    app.get('/api/current_user', (req, res) => {
        if (req.user) {
            res.status(200).send(req.user);
        } else {
            res.status(200).send('not logged in');
        }
    });
};