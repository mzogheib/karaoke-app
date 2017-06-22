(function () {
    'use strict';

    angular
        .module('routes')
        .config(Config)
        .component('signUp', Component());

    function Config ($stateProvider) {
        $stateProvider
            .state('app.signUp', {
                url: '/sign-up',
                title: 'Sign Up',
                template: '<sign-up></sign-up>'
            });
    }

    function Component () {
        return {
            controller: Controller,
            templateUrl: 'sign-up.html'
        };
    }

    function Controller ($window, stateFactory, userService) {
        var ctrl = this;

        ctrl.signUp = signUp;

        ctrl.$onInit = onInit;

        function onInit () {
            ctrl.state = new stateFactory();
        }

        function signUp (credentials) {
            ctrl.state.setLoading();
            userService.signUp(credentials.username, credentials.name, credentials.password)
                .then(function (data) {
                    $window.sessionStorage.token = data.data;
                })
                .catch(function (error) {
                    console.error('Could not sign-up');
                })
                .finally(function () {
                    ctrl.state.setReady();
                });
        }
    }
})();