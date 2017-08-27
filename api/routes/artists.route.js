var ctrlArtists = require('../controllers/artists.controller.js');

module.exports = {
    create: create,
    update: update,
    get: get,
    getAll: getAll,
    delete: deleteOne
};

function create (req, res) {
    var options = {
        name: req.body.name
    };

    var response = {
        status: 201,
        message: {}
    };

    ctrlArtists
        .create(options)
        .then(onSuccess)
        .catch(onError)
        .then(respond);

    function onSuccess (artist) {
        response.message = artist;
    }

    function onError (error) {
        response.status = 500;
        response.message = error;
    }

    function respond () {
        res.status(response.status).json(response.message);
    }
}

function update (req, res) {
    var _id = req.params.id;
    var artist = {
        name: req.body.name,
        songs: req.body.songs
    };

    var response = {
        status: 204,
        message: {}
    };

    ctrlArtists
        .update(_id, artist)
        .then(onSuccess)
        .catch(onError)
        .then(respond);

    function onSuccess () {
        // ...
    }

    function onError (error) {
        response.status = 500;
        response.message = error;
    }

    function respond () {
        res.status(response.status).json(response.message);
    }
}

function get (req, res) {
    var _id = req.params.id;

    var response = {};

    ctrlArtists
        .get(_id)
        .then(onSuccess)
        .catch(onError)
        .then(respond);

    function onSuccess (artist) {
        if (artist) {
            response.status = 200;
            response.message = artist;
        } else {
            response.status = 404;
            response.message = "Artist ID not found";
        }
    }

    function onError (error) {
        response.status = 500;
        response.message = error;
    }

    function respond () {
        res.status(response.status).json(response.message);
    }
}

function getAll (req, res) {
    ctrlArtists
        .getAll()
        .then(onSuccess)
        .catch(onError)
        .then(respond);

    var response = {};

    function onSuccess (artists) {
        if (artists) {
            response.status = 200;
            response.message = artists;
        } else {
            response.status = 404;
            response.message = "Artists not found";
        }
    }

    function onError (error) {
        response.status = 500;
        response.message = error;
    }

    function respond () {
        res.status(response.status).json(response.message);
    }
}

function deleteOne (req, res) {
    var _id = req.params.id;

    var response = {};

    ctrlArtists
        .delete(_id)
        .then(onSuccess)
        .catch(onError)
        .then(respond);

    function onSuccess () {
        response.status = 200;
        response.message = {};
    }

    function onError (error) {
        response.status = 500;
        response.message = error;
    }

    function respond () {
        res.status(response.status).json(response.message);
    }

}