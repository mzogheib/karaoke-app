(function () {
    'use strict';

    angular
        .module('components')
        .component('header', Component());

    function Component () {

        return {
            controller: Controller,
            templateUrl: 'header.html',
            bindings: {}
        };
    }

    function Controller ($state, $transitions) {
        var ctrl = this;

        ctrl.$onInit = onInit;
        ctrl.$onChanges = onChanges;

        function onInit () {
            setHeaderLabel();
            $transitions.onSuccess({}, setHeaderLabel);
        }

        function onChanges () {
            setHeaderLabel();
        }

        function setHeaderLabel () {
            ctrl.label = $state.current.title;
        }
    }
})();