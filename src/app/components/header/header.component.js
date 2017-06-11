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
        ctrl.isLoading = isLoading;

        function leftButtonClick () {
            ctrl.onLeftButtonClick();
        }

        function rightButtonClick () {
            ctrl.onRightButtonClick();
        }

        function isLoading () {
            return ctrl.state === 'loading';
        }
    }
})();