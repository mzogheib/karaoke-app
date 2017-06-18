var mongoose = require('mongoose');
var dburl = process.env.MONGODB_URI;

// https://github.com/Automattic/mongoose/issues/4291
mongoose.Promise = global.Promise;
mongoose.connect(dburl);

mongoose.connection.on('connected', function () {
    console.log('Mongoose connected to ' + dburl);
});

mongoose.connection.on('disconnected', function () {
    console.log('Mongoose disconnected from ' + dburl);
});

mongoose.connection.on('error', function (err) {
    console.log('Error',  err);
});

// System process events

// e.g. ctrl+c
process.on('SIGINT', function () {
    mongoose.connection.close(function () {
        console.log('Mongoose disconnected through app termination (SIGINT)');
        process.exit(0);
    });
});

// e.g. used by heroku
process.on('SIGTERM', function () {
    mongoose.connection.close(function () {
        console.log('Mongoose disconnected through app termination (SIGTERM)');
        process.exit(0);
    });
});

// e.g. used by nodemon, type rs while nodemon is running
process.once('SIGUSR2', function () {
    mongoose.connection.close(function () {
        console.log('Mongoose disconnected through app termination (SIGUSR2)');
        process.kill(process.pid, 'SIGUSR2');
    });
});

// Bring in schemas and models
require('./songs.model.js');
require('./user.model.js');