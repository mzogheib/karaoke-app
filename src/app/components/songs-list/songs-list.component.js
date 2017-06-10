(function () {
    'use strict';

    angular
        .module('components')
        .component('songsList', Component());

    function Component () {

        return {
            controller: Controller,
            templateUrl: 'songs-list.html',
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