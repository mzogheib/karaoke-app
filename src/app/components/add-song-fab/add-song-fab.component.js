(function () {
    'use strict';

    angular
        .module('components')
        .component('addSongFab', Component());

    function Component () {

        return {
            controller: Controller,
            templateUrl: 'add-song-fab.html',
            bindings: {
                songs: '<',
                onRowClick: '&'
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