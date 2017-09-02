var _ = require('lodash');

var ctrlSongs = require('../controllers/songs.controller.js');
var ctrlArtists = require('../controllers/artists.controller.js');

module.exports = {
    create: create,
    update: update,
    get: get,
    getAll: getAll,
    delete: deleteOne
};

// TODO: there are other errors other than just 500s

function create (req, res) {
    var song = {
        title: req.body.title,
        artistId: req.body.artistId,
        artistName: req.body.artistName,
        notes: req.body.notes
    };

    var response = {
        status: 201,
        message: {}
    };

    if (!song.artistId) {
        ctrlArtists
            .create({ name: song.artistName })
            .then(function (newArtist) {
                song.artistId = newArtist._id;
                doCreate();
            })
            .catch(function (error) {
                // TODO: handle error and respond
                console.log(error);
            });
    } else {
        doCreate();
    }

    function doCreate () {
        ctrlSongs
            .create(song)
            .then(function (newSong) {
                song._id = newSong._id;
                return ctrlArtists
                    .addSong(newSong._id, newSong.artistId);
            })
            .then(function () {
                return decorate(song);
            })
            .then(onSuccess)
            .catch(onError)
            .then(respond);
    }

    function onSuccess (song) {
        response.message = song;
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
    var song = {
        title: req.body.title,
        artistId: req.body.artistId,
        oldArtistId: req.body.oldArtistId,
        artistName: req.body.artistName,
        notes: req.body.notes
    };

    var response = {
        status: 204,
        message: {}
    };

    if (!song.artistId) {
        ctrlArtists
            .create({ name: song.artistName })
            .then(function (newArtist) {
                song.artistId = newArtist._id;
                doUpdate();
            })
            .catch(function (error) {
                // TODO: handle error and respond
                console.log(error);
            });
    } else {
        doUpdate();
    }
    
    function doUpdate () {
        if (song.oldArtistId) {
            ctrlArtists
                .removeSong(_id, song.oldArtistId)
                .then(function () {
                    return ctrlSongs
                        .update(_id, song)
                })
                .then(function (updatedSong) {
                    return ctrlArtists
                        .addSong(_id, song.artistId);
                })
                .then(onSuccess)
                .catch(onError)
                .then(respond);
        } else {
            ctrlSongs
                .update(_id, song)
                .then(onSuccess)
                .catch(onError)
                .then(respond);
        }
    }

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

    ctrlSongs
        .get(_id)
        .then(decorate)
        .then(onSuccess)
        .catch(onError)
        .then(respond);

    function onSuccess (song) {
        if (song) {
            response.status = 200;
            response.message = song;
        } else {
            response.status = 404;
            response.message = "Song ID not found";
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
    ctrlSongs
        .getAll()
        .then(decorate)
        .then(onSuccess)
        .catch(onError)
        .then(respond);

    var response = {};

    function onSuccess (songs) {
        if (songs) {
            response.status = 200;
            response.message = songs;
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
    var artistId = req.body.artistId;
    
    var response = {};

    ctrlSongs
        .delete(_id)
        .then(function () {
            return ctrlArtists
                .removeSong(_id, artistId)
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

function decorate (songs) {
    if (!songs || songs.length === 0) {
        return;
    }

    if (songs.length) {
        var promises = _.map(songs, function (song) {
            return decorateOne(song);
        });
        return Promise.all(promises);
    } else {
        return decorateOne(songs);
    }
}

function decorateOne (song) {
    return new Promise (function (resolve, reject) {
        ctrlArtists
            .get(song.artistId)
            .then(function (artist) {
                resolve({
                    _id: song._id,
                    title: song.title,
                    artistId: song.artistId,
                    artistName: artist.name,
                    notes: song.notes
                });
            })
            .catch(function (error) {
                reject(error);
            });
    });
}