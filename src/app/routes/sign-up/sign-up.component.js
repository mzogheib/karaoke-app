(function () {
    'use strict';

    angular
        .module('routes')
        .config(Config)
        .component('signUp', Component());

    function Config ($stateProvider) {
        $stateProvider
            .state('signUp', {
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

    function Controller ($state, stateFactory, userService) {
        var ctrl = this;

        ctrl.signUp = signUp;

        ctrl.$onInit = onInit;

        function onInit () {
            ctrl.state = new stateFactory();
        }

        function signUp (credentials) {
            ctrl.state.setLoading();
            userService.signUp(credentials.username, credentials.name, credentials.password)
                .then(function () {
                    $state.go('app.songs');
                })
                .catch(function (error) {
                    console.error('Could not sign-up', error);
                })
                .finally(function () {
                    ctrl.state.setReady();
                });
        }
    }
})();