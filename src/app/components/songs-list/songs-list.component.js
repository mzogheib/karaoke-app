(function () {
    'use strict';

    angular
        .module('component.songsList')
        .component('songsList', component());

    function component () {

        return {
            controller: controller,
            templateUrl: 'templates/components/songs-list/songs-list.html',
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