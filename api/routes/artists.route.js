var _ = require('lodash');

var ctrlArtists = require('../controllers/artists.controller.js');
var ctrlSongs = require('../controllers/songs.controller.js');

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
        .then(decorate)
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
        .then(decorate)
        .then(onSuccess)
        .catch(onError)
        .then(respond);

    var response = {};

    function onSuccess (artists) {
        if (artists) {
            response.status = 200;
            response.message = artists;
        } else {
            response.status = 200;
            response.message = [];
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
        .get(_id)
        .then(function (artist) {
            var promises = _.map(artist.songIds, function (songId) {
                ctrlSongs.delete(songId);
            });

            return Promise.all(promises);
        })
        .then(function () {
            return ctrlArtists
                .delete(_id)
        })
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

function decorate (artists) {
    if (!artists || artists.length === 0) {
        return;
    }

    if (artists.length) {
        var promises = _.map(artists, function (artist) {
            return decorateOne(artist);
        });
        return Promise.all(promises);
    } else {
        return decorateOne(artists);
    }
}

function decorateOne (artist) {
    return ctrlSongs
        .getAll(artist.songIds)
        .then(function (songs) {
            artist.songs = _.map(songs, function (song) {
                return {
                    _id: song._id,
                    title: song.title
                }
            });
            delete artist.songIds;
            return artist;
        })
        .catch(function (error) {
            console.log('error', error)
        });
}