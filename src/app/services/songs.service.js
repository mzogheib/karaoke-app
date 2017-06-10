(function () {
    'use strict';

    angular
        .module('services.songs', [])
        .service('songsService', service);

    function service ($q) {
        var cache = {
            mySongs: [
                {
                    id: _.uniqueId(),
                    title: 'What\'s New Pussycat',
                    artist: {
                        id: '',
                        name: 'Tom Jones'
                    }
                },
                {
                    id: _.uniqueId(),
                    title: 'For Your Love',
                    artist: {
                        id: '',
                        name: 'The Yardbirds'
                    }
                }
            ]
        };

        this.getSongs = function () {
            return $q(function (resolve, reject) {
                resolve(cache.mySongs);
            });
        };

        this.getSongById = function (id) {
            return $q(function (resolve, reject) {
                var song = _.find(cache.mySongs, { id: id });
                resolve(song);
            });
        }
    }
})();
