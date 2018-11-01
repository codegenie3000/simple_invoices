const mongoose = require('mongoose');

module.exports = function(collectionName, done, cb) {
    mongoose.connection.dropCollection(collectionName, function (err) {
        if (err) {
            console.log(err);
            done();
        }
        if (cb) {
            cb();
        }
        done();
    });
};