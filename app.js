const express = require('express');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const expressValidator = require('express-validator');
const passport = require('passport');
const cookieSession = require('cookie-session');
const mongoose = require('mongoose');
// const path = require('path');

const keys = require('./config/keys');

require('./models/User');
require('./services/passport');

//mongoose
mongoose.connect(keys.mongoURI);

// const seed = require('./seeds');
// seed();

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true}));

app.use(
    cookieSession(({
        maxAge: 30 * 24 * 60 * 1000,
        keys: [keys.cookieKey]
    }))
);

app.use(passport.initialize());
app.use(passport.session());

require('./routes/authRoutes')(app);
require('./routes/invoiceRoutes')(app);
require('./routes/recipientRoutes')(app);

app.use('/test', (req, res) => {
    res.send('home');
});

/*app.get('/api/!*', (req, res, next) => {
    let err = new Error('Page Not Found');
    err.statusCode = 404;
    next(err);
});

app.use((err, req, res, next) => {
    console.log(err.message);
    if (!err.statusCode) err.statusCode = 500;
    res.status(err.statusCode).send(err.message);
});*/

// for testing purposes
if (process.env.NODE_ENV === 'test') {
    module.exports = app;
} else {
    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => {
        console.log(`App is listening on port ${PORT}`);
    });
}