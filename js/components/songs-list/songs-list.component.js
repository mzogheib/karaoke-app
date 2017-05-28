(function () {
    'use strict';

    angular
        .module('component.songsList')
        .component('songsList', component());

    function component () {

        return {
            controller: controller,
            templateUrl: './js/components/songs-list/songs-list.html',
            bindings: {
                songs: '<'
            }
        };
    }

    function controller () {
        var ctrl = this;

        ctrl.$onInit = onInit;

        function onInit () {
            console.log('songs-list controller', ctrl.songs);
        }
    }
})();