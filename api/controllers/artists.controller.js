var mongoose = require('mongoose');
var _ = require('lodash');

var Artist = mongoose.model('Artist');

module.exports = {
    create: create,
    update: update,
    delete: deleteOne,
    get: get,
    getAll: getAll
};

function create (options) {
    return new Promise(function (resolve, reject) {
        Artist.create(options, function (error, artist) {
            if (error) {
                reject(error);
            } else {
                resolve(artist);
            }
        });
    });
}

function update (options) {
    var artist = options.artist;
    artist.name = options.name;
    artist.songs = options.songs;

    return new Promise(function (resolve, reject) {
        artist.save(function (error, artistUpdated) {
            if (error) {
                reject(error);
            } else {
                resolve();
            }
        });
    });
}

function deleteSongs (songs) {
    return new Promise(function (resolve, reject) {
        console.log('deleteSongs');
        _.forEach(songs, function (song) {
            console.log(song._id);
        });
        resolve();
    });
}

function deleteOne (options) {
    return new Promise(function (resolve, reject) {
        get(options)
            .then(function (artist) {
                console.log('getArtistSongs');
                if (artist) {
                    return deleteSongs(artist.songs)
                }
            })
            .then(function () {
                console.log('deleteArtist');
                Artist
                    .findByIdAndRemove(options.id)
                    .exec(function (error, doc) {
                        if (error) {
                            reject(error);
                        } else {
                            resolve();
                        }
                    });
            })
            .catch(function (error) {
                reject(error);
            });
    });
}

function get (options) {
    return new Promise(function (resolve, reject) {
        console.log('get', options)
        Artist.findById(options.id).exec(function (error, doc) {
            console.log(error, doc)
            if (error) {
                reject(error);
            } else {
                resolve(doc);
            }
        });
    });
}

function getAll () {
    return new Promise(function (resolve, reject) {
        Artist.find().exec(function (error, doc) {
            if (error) {
                reject(error);
            } else {
                resolve(doc);
            }
        });
    });
}