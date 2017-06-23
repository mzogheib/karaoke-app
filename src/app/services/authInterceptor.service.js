(function () {
    'use strict';

    angular
        .module('services')
        .service('authInterceptorService', Service);

    function Service ($q, $state, $window, authService) {

        this.request = function (config) {
            var token = authService.getAuth();
            config.headers = config.headers || {};

            if (!!token) {
                config.headers.Authorization = 'Bearer ' + token;
            }

            return config;
        };

        this.response = function (response) {
            var token = $window.sessionStorage.token;

            if (response.status === 200 && token && !authService.isLoggedIn) {
                authService.isLoggedIn = true;
            }

            if (response.status === 401) {
                authService.isLoggedIn = false;
            }

            return response || $q.when.response;
        };

        this.responseError = function (rejection) {
            if (response.status === 401 || response.status === 403) {
                delete $window.sessionStorage.token;
                authService.isLoggedIn = false;
                $state.go('login');
            }

            return $q.reject(rejection);
        };

    }
})();
