(function () {
    'use strict';

    angular
        .module('services')
        .service('artistsService', Service);

    function Service ($q, $http) {

        this.getArtists = function () {
            return $q(function (resolve, reject) {
                $http.get('/api/artists')
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

        this.getArtistById = function (id) {
            return $q(function (resolve, reject) {
                $http.get('/api/artists/' + id)
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

        this.save = function (artist) {
            return $q(function (resolve, reject) {
                $http.put('/api/artists/' + artist._id, artist)
                    .then(onSuccess)
                    .catch(onError);

                function onSuccess (data) {
                    resolve(data);
                }

                function onError (err) {
                    reject(err.statusText);
                }
            });
        };

        this.delete = function (id) {
            return $q(function (resolve, reject) {
                $http.delete('/api/artists/' + id)
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

    }
})();
