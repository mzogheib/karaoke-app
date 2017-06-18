var mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs');
var User = mongoose.model('User');

module.exports = {
    register: register,
    login: login
};

function register (req, res) {
    console.log('Registering user');

    var newUser = {
        username: req.body.username,
        name: req.body.name,
        password: bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(10))
    }

    User
        .create(newUser, function (err, user) {
            if (err) {
                console.log(err);
                res.status(400).json(err);
            } else {
                console.log('New user created', user);
                res.status(201).json(user);
            }
        });
}

function login (req, res) {
    console.log('Logging in user');

    var username = req.body.username;
    var password = req.body.password;

    User
        .findOne({
            username: username
        })
        .exec(function ( err, user) {
            if (err) {
                console.log(err);
                res.status(400).json(err);
            } else {
                if (bcrypt.compareSync(password, user.password)) {
                    console.log('User found', user);
                    res.status(200).json(user);
                } else {
                    res.status(400).json('Unauthorized');
                }
            }
        });
}