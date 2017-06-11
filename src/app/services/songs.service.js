(function () {
    'use strict';

    angular
        .module('services')
        .service('songsService', Service);

    function Service ($q) {
        var cache = {
            mySongs: [
                {
                    id: _.uniqueId(),
                    title: 'What\'s New Pussycat',
                    artist: {
                        id: _.uniqueId(),
                        name: 'Tom Jones'
                    }
                },
                {
                    id: _.uniqueId(),
                    title: 'For Your Love',
                    artist: {
                        id: _.uniqueId(),
                        name: 'The Yardbirds'
                    }
                }
            ]
        };

        this.initNewSong = function () {
            return {
                id: null,
                title: null,
                artist: {
                    id: null,
                    name: null
                }
            };
        };

        this.getSongs = function () {
            return $q(function (resolve, reject) {
                resolve(cache.mySongs);
            });
        };

        this.getSongById = function (id) {
            return $q(function (resolve, reject) {
                var song = _.find(cache.mySongs, { id: id });
                if (song) {
                    resolve(_.cloneDeep(song));
                } else {
                    reject();
                }
            });
        };

        this.save = function (song) {
            return $q(function (resolve, reject) {
                if (song.id) {
                    var cachedSong = _.find(cache.mySongs, { id: song.id });
                    angular.copy(song, cachedSong);
                } else {
                    song.id = _.uniqueId();
                    song.artist.id = _.uniqueId();
                    cache.mySongs.push(song);
                }
                resolve(song);
            });
        };
    }
})();
