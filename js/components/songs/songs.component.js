(function () {
    'use strict';

    angular
        .module('component.songs')
        .component('songs', component());

    function component () {
        return {
            controller: controller,
            templateUrl: './js/components/songs/songs.html',
            bindings: {}
        };
    }

    function controller (songsService) {
        console.log('songs controller');

        var ctrl = this;

        ctrl.$onInit = onInit;

        function onInit () {
            ctrl.songs = songsService.getSongs();
        }
    }
})();