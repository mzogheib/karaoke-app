(function () {
    'use strict';

    angular
        .module('services')
        .service('songsService', Service);

    function Service ($q, $http) {
        var cache = {
            mySongs: []
        };

        this.initNewSong = function () {
            return {
                title: null,
                artistName: null
            };
        };

        this.getSongs = function () {
            return $q(function (resolve, reject) {
                $http.get('/api/songs')
                    .then(onSuccess)
                    .catch(onError);

                function onSuccess(response) {
                    var songs = _.map(response.data, function (songData) {
                        return fromServer(songData);
                    });
                    resolve(songs);
                }

                function onError(err) {
                    reject(err.statusText);
                }
            });
        };

        this.getSongById = function (id) {
            return $q(function (resolve, reject) {
                $http.get('/api/songs/' + id)
                    .then(onSuccess)
                    .catch(onError);

                function onSuccess(response) {
                    resolve(fromServer(response.data));
                }

                function onError(err) {
                    reject(err.statusText);
                }
            });
        };

        this.save = function (song) {            
            return $q(function (resolve, reject) {
                if (song._id) {
                    $http.put('/api/songs/' + song._id, toServer(song))
                        .then(onSuccess)
                        .catch(onError);
                } else {
                    $http.post('/api/songs', toServer(song))
                        .then(onSuccess)
                        .catch(onError);
                }

                function onSuccess (data) {
                    if (data && data.data) {
                        resolve(fromServer(data.data));
                    } else {
                        // Bit of a hack as not from server but ok for now
                        resolve(fromServer(song));
                    }
                }

                function onError (err) {
                    reject(err.statusText);
                }
            });
        };

        this.delete = function (songId) {
            return $q(function (resolve, reject) {
                $http.delete('/api/songs/' + songId)
                    .then(onSuccess)
                    .catch(onError);

                function onSuccess () {
                    resolve();
                }

                function onError (err) {
                    reject(err.statusText);
                }
            });
        };

        function fromServer (data) {
            var song;

            song = data;
            song.oldArtistId = angular.copy(data.artistId);

            return song;
        }

        function toServer (song) {
            if (song.oldArtistId === song.artistId) {
                song.oldArtistId = undefined;
            }

            return angular.copy(song);
        }
    }
})();
