const express = require('express');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const expressValidator = require('express-validator');
const passport = require('passport');
const cookieSession = require('cookie-session');
const mongoose = require('mongoose');

const keys = require('./config/keys');

require('./models/User');
require('./services/passport');

//mongoose
mongoose.connect(keys.mongoURI);

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

app.use('/home', (req, res) => {
    res.send('home');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT);