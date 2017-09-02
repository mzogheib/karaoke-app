(function () {
    'use strict';

    angular
        .module('components')
        .component('artistViewer', Component());

    function Component () {

        return {
            controller: Controller,
            templateUrl: 'artist-viewer.html',
            bindings: {
                artist: '<'
            }
        };
    }

    function Controller () {
        var ctrl = this;

        ctrl.$onInit = onInit;
        ctrl.$onChanges = onChanges;

        function onInit () {
        }

        function onChanges () {
        }
    }
})();