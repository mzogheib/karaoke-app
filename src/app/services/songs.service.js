(function () {
    'use strict';

    angular
        .module('services.songs', [])
        .service('songsService', service);

    function service () {
        var cache = {
            mySongs: []
        };

        this.getSongs = function () {
            return cache.mySongs;
        }

        this.addToLibrary = function (song) {
            cache.mySongs.push(song);
        }
    }
})();
