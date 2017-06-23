(function () {
    'use strict';

    angular
        .module('services')
        .service('userService', Service);

    function Service ($q, $http, authService) {

        this.signUp = function (username, name, password) {
            return $q(function (resolve, reject) {
                var newUser = {
                    username: username,
                    name: name,
                    password: password
                };

                $http.post('/api/sign-up', newUser)
                    .then(onSuccess)
                    .catch(onError);

                function onSuccess (data) {
                    authService.setAuth(data.data);
                    resolve();
                }

                function onError (err) {
                    reject(err);
                }
            });
        };

        this.login = function (username, password) {
            return $q(function (resolve, reject) {
                var user = {
                    username: username,
                    password: password
                };

                $http.post('/api/login', user)
                    .then(onSuccess)
                    .catch(onError);

                function onSuccess (data) {
                    authService.setAuth(data.data.token);
                    resolve();
                }

                function onError (err) {
                    reject(err.statusText);
                }
            });
        };

    }
})();
