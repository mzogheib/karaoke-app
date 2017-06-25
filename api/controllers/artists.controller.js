var mongoose = require('mongoose');
var Artist = mongoose.model('Artist');

module.exports = {
    create: create,
    update: update,
    delete: deleteOne,
    getOne: getOne,
    getAll: getAll
};

function create (req, res) {
    Artist
        .create({
            name: req.body.name
        }, function (err, artist) {
            if (err) {
                res
                    .status(400)
                    .json(err);
            } else {
                res
                    .status(201)
                    .json(artist);
            }
        });
}

function update (req, res) {
    var artistId = req.params.id;

    Artist
        .findById(artistId)
        .exec(function (err, doc) {
            var response = {
                status: 200,
                message: doc
            };

            if (err) {
                response.status = 500;
                response.message = err;
            } else if (!doc) {
                response.status = 404;
                response.message = {
                    "message": "Artist ID not found"
                };
            }

            // If the artist is found then update it
            if (response.status === 200) {
                doc.name = req.body.name;
                doc.songs = req.body.songs;

                doc.save(function (err, artistUpdated) {
                    if (err) {
                        res
                            .status(500)
                            .json(err);
                    } else {
                        res
                            .status(204)
                            .json();
                    }
                });
            } else {
                res
                    .status(response.status)
                    .json(response.message);
            }
        });
}

function deleteOne (req, res) {
    var artistId = req.params.id;

    Artist
        .findByIdAndRemove(artistId)
        .exec(function (err, doc) {
            var response = {
                status: 200,
                message: {}
            };

            if (err) {
                response.status = 404;
                response.message = err;
            }

            res
                .status(response.status)
                .json(response.message);
        });
}

function getOne (req, res) {
    var artistId = req.params.id;

    Artist
        .findById(artistId)
        .exec(function (err, doc) {
            var response = {
                status: 200,
                message: doc
            };

            if (err) {
                response.status = 500;
                response.message = err;
            } else if (!doc) {
                response.status = 404;
                response.message = {
                    "message": "Artist ID not found"
                };
            }

            res
                .status(response.status)
                .json(response.message);
        });
}

function getAll (req, res) {
    Artist
        .find()
        .exec(function (err, artists) {
            if (err) {
                res
                    .status(500)
                    .json(err)
            } else {
                res
                    .json(artists);
            }
        })
}