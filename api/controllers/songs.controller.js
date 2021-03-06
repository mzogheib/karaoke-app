var _ = require('lodash');

var mongoose = require('mongoose');
var Song = mongoose.model('Song');

module.exports = {
    create: create,
    update: update,
    delete: deleteOne,
    get: get,
    getAll: getAll
};

function create (song) {
    return new Promise(function (resolve, reject) {
        Song
            .create(song, function (error, song) {
                if (error) {
                    reject(error);
                } else {
                    resolve(song);
                }
            });
    });
}

function update (_id, song) {
    return new Promise(function (resolve, reject) {
        Song
            .update({ _id: _id }, song, function (error, songUpdated) {
                if (error) {
                    reject(error);
                } else {
                    resolve();
                }
            });
    });
}

function deleteOne (_id) {
    return new Promise(function (resolve, reject) {
        Song
            .findByIdAndRemove(_id)
            .exec(function (error) {
                if (error) {
                    reject(error);
                } else {
                    resolve();
                }
            });
    });
}

function get (_id) {
    return new Promise(function (resolve, reject) {
        Song
            .findById(_id)
            .exec(function (error, song) {
                if (error) {
                    reject(error);
                } else {
                    resolve(song);
                }
            });
    });
}

function getAll (_ids) {
    var query;
    if (_ids && _ids.length) {
        query = {
            '_id': {
                $in: _.map(_ids, function (_id) {
                    return mongoose.Types.ObjectId(_id);
                })
            }
        };
    }
    return new Promise(function (resolve, reject) {
        Song
            .find(query)
            .exec(function (error, songs) {
                if (error) {
                    reject(error);
                } else {
                    resolve(songs);
                }
            });
    });
}