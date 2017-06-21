(function () {
    'use strict';

    angular
        .module('components')
        .component('userCredentials', Component());

    function Component () {

        return {
            controller: Controller,
            templateUrl: 'user-credentials.html',
            bindings: {
                isSignUp: '<',
                state: '<',
                onSubmit: '&'
            }
        };
    }

    function Controller () {
        var ctrl = this;

        ctrl.$onInit = onInit;

        function onInit () {
            ctrl.buttonText = ctrl.onSubmit ? 'Sign Up' : 'Login';
        }
    }
})();