(function () {
    'use strict';

    angular
        .module('components')
        .component('songViewer', Component());

    function Component () {

        return {
            controller: Controller,
            templateUrl: 'song-viewer.html',
            bindings: {
                song: '<'
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