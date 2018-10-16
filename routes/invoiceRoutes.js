const requireLogin = require('../middleware/requireLogin');

module.exports = app => {
    app.get('/api', requireLogin, (req, res) => {
        res.send('/api route reached');
    });
};