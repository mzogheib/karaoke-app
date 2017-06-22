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

        function signUp (username, name, password) {
            ctrl.state.setLoading();
            userService.signUp(username, name, password)
                .then(function (data) {
                    $window.sessionStorage.token = data.data;
                    ctrl.state.setReady();
                });
        }
    }
})();