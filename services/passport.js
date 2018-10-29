const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const mongoose = require('mongoose');
const keys = require('../config/keys');

const User = mongoose.model('Users');

passport.serializeUser((user, done) => {
    console.log('serialized user');
    done(null, user.id);
});

passport.deserializeUser((id, done) => {
    console.log('deserialized user');
    User.findById(id)
        .then(user => {
            done(null, user);
        });
});

passport.use(
    new GoogleStrategy(
        {
            clientID: keys.googleClientID,
            clientSecret: keys.googleClientSecret,
            callbackURL: '/auth/google/callback'
            // proxy: true // fixes issue with running app through heroku's proxy server
        },

        async (accessToken, refreshToken, profile, done) => {
            const existingUser = await User.findOne({ googleId: profile.id});
            if (existingUser) {
                // already have a record w/ given profile ID
                console.log('user exists');
                return done(null, existingUser);
            }

            // create new record
            const {familyName, givenName} = profile.name;
            const user = await new User({ googleId: profile.id, firstName: givenName, lastName: familyName, displayName: profile.displayName, email: profile.emails[0].value }).save();
            console.log('created new user', user);
            done(null, user);
        }
    )
);