const passport = require('passport');
const User = require('../models/User');

module.exports = (app) => {
    // passport-local signup
    app.post('/auth/local/signup', (req, res, next) => {
        const {email, displayName} = req.body;
        const NewUser = new User({
            email: email,
            displayName: displayName
        });
        User.register(NewUser, req.body.password, (err) => {
            if (err) {
                next(err);
            }
            passport.authenticate('local')(req, res, () => {
                const user = req.user;
                const userObject = {
                    email: user.email,
                    displayName: user.displayName,
                    recipients: user.recipients
                };
                res.status(200).send(userObject);
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

    app.get('/api/current_user', (req, res, next) => {
        if (req.user) {
            const user = req.user;
            const userObject = {
                email: user.email,
                displayName: user.displayName,
                recipients: user.recipients
            };
            res.status(200).send(userObject);
        } else {
            res.status(200).send({isLoggedIn: false});
        }
        /*if (req.user) {
            res.status(200).send(req.user);
        } else {
            res.status(200).send('not logged in');
        }*/
    });
};