(function () {
    'use strict';

    angular
        .module('routes')
        .config(Config)
        .component('login', Component());

    function Config ($stateProvider) {
        $stateProvider
            .state('app.login', {
                url: '/login',
                title: 'Login',
                template: '<login></login>'
            });
    }

    function Component () {
        return {
            controller: Controller,
            templateUrl: 'login.html'
        };
    }

    function Controller ($state, stateFactory, userService) {
        var ctrl = this;

        ctrl.login = login;

        ctrl.$onInit = onInit;

        function onInit () {
            ctrl.state = new stateFactory();
        }

        function login (credentials) {
            ctrl.state.setLoading();
            userService.login(credentials.username, credentials.password)
                .then(function () {
                    $state.go('app.songs');
                })
                .catch(function (error) {
                    console.error('Could not login', error);
                })
                .finally(function () {
                    ctrl.state.setReady();
                });
        }
    }
})();