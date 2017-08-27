var mongoose = require('mongoose');
var _ = require('lodash');

var Artist = mongoose.model('Artist');

module.exports = {
    create: create,
    update: update,
    addSong: addSong,
    removeSong: removeSong,
    delete: deleteOne,
    get: get,
    getBySong: getBySong,
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

function addSong (songId, artistId) {
    return get(artistId)
        .then(function (artist) {
            if (_.indexOf(artist.songIds, songId) === -1) {
                artist.songIds.push(songId);
                return update(artist._id, artist);
            }

            return;
        });
}

function removeSong (songId, artistId) {
    return getBySong(songId)
        .then(function (artists) {
            var promises = [];

            _.each(artists, function (artist) {
                _.pull(artist.songIds, songId);
                promises.push(update(artist._id, artist));
            });

            return Promise.all(promises);
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

function getBySong (songId) {
    return new Promise(function (resolve, reject) {
        Artist
            .find({ songIds: songId })
            .exec(function (error, artists) {
                if (error) {
                    reject(error);
                } else {
                    resolve(artists);
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