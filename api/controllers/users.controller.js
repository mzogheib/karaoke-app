var mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs');
var jwt = require('jsonwebtoken');
const JWT_SECRET = process.env.JWT_SECRET;

var User = mongoose.model('User');

module.exports = {
    signUp: signUp,
    login: login,
    authenticate: authenticate
};

function signUp (req, res) {
    console.log('Signing up user');

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
                var token = jwt.sign({ username: user.username }, JWT_SECRET, { expiresIn: 3600 });
                res.status(201).json(token);
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
        .exec(function (err, user) {
            if (err) {
                res.status(400).json(err);
                return;
            } 

            if (!user) {
                res.status(404).json('Error finding user.');
                return;
            }

            if (bcrypt.compareSync(password, user.password)) {
                var token = jwt.sign({ username: user.username }, JWT_SECRET, { expiresIn: 3600 });
                res.status(200).json(token);
            } else {
                res.status(401).json('Unauthorized');
            }
        });
}

function authenticate (req, res, next) {
    var headerExists = !!req.headers.authorization;

    if (headerExists) {
        // "Authorization: Bearer xxx". The token is the second element in the authorization value
        var token = req.headers.authorization.split(' ')[1];
        jwt.verify(token, JWT_SECRET, function (error, decoded) {
            if (error) {
                console.log(error);
                res.status(401).json('Unauthorized');
            } else {
                // username was added to the token during login above so can retrieve it again here
                req.user = decoded.username;
                next();
            }
        })
    } else {
        res.status(403).json('No token provided');
    }
}