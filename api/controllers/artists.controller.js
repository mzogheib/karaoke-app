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

function create (artist) {
    return new Promise(function (resolve, reject) {
        Artist
            .create(artist, function (error, artist) {
                if (error) {
                    reject(error);
                } else {
                    resolve(artist);
                }
            });
    });
}

function update (_id, artist) {
    return new Promise(function (resolve, reject) {
        Artist
            .update({ _id: _id }, artist, function (error, artistUpdated) {
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

function deleteOne (_id) {
    return new Promise(function (resolve, reject) {
        get(_id)
            .then(function (artist) {
                console.log('getArtistSongs');
                if (artist) {
                    return deleteSongs(artist.songs)
                } else {
                    // TODO: reject with something useful
                    reject();
                }
            })
            .then(function () {
                console.log('deleteArtist');
                Artist
                    .findByIdAndRemove(_id)
                    .exec(function (error) {
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

function get (_id) {
    return new Promise(function (resolve, reject) {
        Artist
            .findById(_id)
            .exec(function (error, artist) {
                if (error) {
                    reject(error);
                } else {
                    resolve(artist);
                }
            });
    });
}

function getAll () {
    return new Promise(function (resolve, reject) {
        Artist
            .find()
            .exec(function (error, artists) {
                if (error) {
                    reject(error);
                } else {
                    resolve(artists);
                }
            });
    });
}