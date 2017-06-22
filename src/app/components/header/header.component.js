(function () {
    'use strict';

    angular
        .module('components')
        .component('header', Component());

    function Component () {

        return {
            controller: Controller,
            templateUrl: 'header.html',
            bindings: {
                title: '@',
                leftText: '<',
                rightText: '<',
                onLeftButtonClick: '&',
                onRightButtonClick: '&',
                state: '<'
            }
        };
    }

    function Controller ($state, $transitions) {
        var ctrl = this;

        ctrl.leftButtonClick = leftButtonClick;
        ctrl.rightButtonClick = rightButtonClick;

        ctrl.$onInit = onInit;

        function onInit () {
            ctrl.showLeftButton = !!ctrl.onLeftButtonClick && !!ctrl.leftText;
            ctrl.showRightButton = !!ctrl.onRightButtonClick && !!ctrl.rightText;
        }

        function leftButtonClick () {
            ctrl.onLeftButtonClick();
        }

        function rightButtonClick () {
            ctrl.onRightButtonClick();
        }
    }
})();