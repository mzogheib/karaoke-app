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
    }
})();
