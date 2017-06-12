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
                artist: {
                    name: null
                }
            };
        };

        this.getSongs = function () {
            return $q(function (resolve, reject) {
                $http.get('/api/songs')
                    .then(onSuccess)
                    .catch(onError);

                function onSuccess(response) {
                    resolve(response.data);
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
                    resolve(response.data);
                }

                function onError(err) {
                    reject(err.statusText);
                }
            });
        };

        this.save = function (song) {
            return $q(function (resolve, reject) {
                if (song._id) {
                    $http.put('/api/songs/' + song._id, song)
                        .then(onSuccess)
                        .catch(onError);
                } else {
                    $http.post('/api/songs', song)
                        .then(onSuccess)
                        .catch(onError);
                }

                function onSuccess (data) {
                    resolve(data);
                }

                function onError (err) {
                    reject(err.statusText);
                }
            });
        };
    }
})();
