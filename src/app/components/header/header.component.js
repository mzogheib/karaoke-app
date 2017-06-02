(function () {
    'use strict';

    angular
        .module('component.header')
        .component('header', component());

    function component () {

        return {
            controller: controller,
            templateUrl: 'templates/components/header/header.html',
            bindings: {}
        };
    }

    function controller ($state, $transitions) {
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