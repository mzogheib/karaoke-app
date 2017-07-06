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

    ctrlArtists
        .create(options);
}

function update (req, res) {
    var options = {
        id: req.params.id,
        name: req.body.name,
        songs: req.body.songs
    };

    var response = {
        status: 204,
        message: {}
    };

    ctrlArtists
        .getOne(options)
        .then(function (artist) {
            if (artist) {
                options.artist = artist;
                return ctrlArtists.update(options);
            } else {
                response.status = 404;
                response.message = "Artist ID not found";
            }
        })
        .catch(onError)
        .then(respond);

    function onError (error) {
        response.status = 500;
        response.message = error;
    }

    function respond () {
        res.status(response.status).json(response.message);
    }
}

function get (req, res) {
    var options = {
        id: req.params.id
    };

    var response = {};

    ctrlArtists
        .get(options)
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
    var options = {
        id: req.params.id
    };

    var response = {};

    ctrlArtists
        .delete(options)
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