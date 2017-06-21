(function () {
    'use strict';

    angular
        .module('services')
        .service('userService', Service);

    function Service ($q, $http) {

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
                    resolve(data);
                }

                function onError (err) {
                    reject(err.statusText);
                }
            });
        };

        this.login = function (username, password) {
        };

    }
})();
