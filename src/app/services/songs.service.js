(function () {
    'use strict';

    angular
        .module('services.songs', [])
        .service('songsService', service);

    function service (Spotify) {
        var cache = {
            mySongs: []
        };

        this.getSongs = function () {
            return cache.mySongs;
        }

        this.searchSongsProvider = function (query) {
            return Spotify.search(query, 'artist,track');
        }

        this.addToLibrary = function (song) {
            cache.mySongs.push(song);
        }
    }
})();
