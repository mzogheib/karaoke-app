var mongoose = require('mongoose');
var Song = mongoose.model('Song');

module.exports = {
    create: create,
    update: update,
    getOne: getOne,
    getAll: getAll
};

function create (req, res) {
    Song
        .create({
            title: req.body.title,
            artist: {
                name: req.body.artist.name
            }
        }, function (err, song) {
            if (err) {
                console.log('Error creating song');
                res
                    .status(400)
                    .json(err);
            } else {
                console.log('Created song');
                res
                    .status(201)
                    .json(song);
            }
        });
}

function update (req, res) {
    var songId = req.params.id;

    Song
        .findById(songId)
        // Exclude artist
        // .select("-artist")
        .exec(function (err, doc) {
            var response = {
                status: 200,
                message: doc
            };

            if (err) {
                console.log('Error finding song');
                response.status = 500;
                response.message = err;
            } else if (!doc) {
                response.status = 404;
                response.message = {
                    "message": "Song ID not found"
                };
            }

            // If the song is found then update it
            if (response.status === 200) {
                doc.title = req.body.title;
                doc.artist.name = req.body.artist.name;

                doc.save(function (err, songUpdated) {
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

function getOne (req, res) {
    var songId = req.params.id;

    Song
        .findById(songId)
        .exec(function (err, doc) {
            var response = {
                status: 200,
                message: doc
            };

            if (err) {
                console.log('Error finding song');
                response.status = 500;
                response.message = err;
            } else if (!doc) {
                response.status = 404;
                response.message = {
                    "message": "Song ID not found"
                };
            }

            res
                .status(response.status)
                .json(response.message);
        });
}

function getAll (req, res) {
    Song
        .find()
        .exec(function (err, songs) {
            if (err) {
                console.log('Error finding songs');
                res
                    .status(500)
                    .json(err)
            } else {
                console.log('Found songs', songs.length);
                res
                    .json(songs);
            }
        })
}