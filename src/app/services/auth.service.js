(function () {
    'use strict';

    angular
        .module('services')
        .service('authService', Service);

    function Service ($window) {

        this.setAuth = function (token) {
            $window.sessionStorage.token = token;
        };

        this.clearAuth = function () {
            delete $window.sessionStorage.token;
        };

        this.getAuth = function () {
            return $window.sessionStorage.token;
        };
    }
})();
