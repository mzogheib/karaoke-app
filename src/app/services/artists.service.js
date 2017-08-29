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

    }
})();
