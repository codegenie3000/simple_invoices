const passport = require('passport');
const mongoose = require('mongoose');
const keys = require('../config/keys');
const LocalStrategy = require('passport-local').Strategy;

// const User = mongoose.model('Users');
const User = require('../models/User');

passport.serializeUser((user, done) => {
    // console.log('serialized user');
    done(null, user.id);
});

passport.deserializeUser((id, done) => {
    // console.log('deserialized user');
    User.findById(id)
        .then(user => {
            done(null, user);
        });
});

passport.use(User.createStrategy());