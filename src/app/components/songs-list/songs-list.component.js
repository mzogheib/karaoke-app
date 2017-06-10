(function () {
    'use strict';

    angular
        .module('components')
        .component('songsList', component());

    function component () {

        return {
            controller: controller,
            templateUrl: 'songs-list.html',
            bindings: {
                songs: '<',
                onRowClick: '&'
            }
        };
    }

    function controller () {
        var ctrl = this;

        ctrl.$onInit = onInit;
        ctrl.$onChanges = onChanges;

        function onInit () {
        }

        function onChanges () {
        }
    }
})();