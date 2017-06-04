(function () {
    'use strict';

    angular
        .module('component.songs')
        .component('songs', component());

    function component () {
        return {
            controller: controller,
            templateUrl: 'songs.html',
            bindings: {}
        };
    }

    function controller ($state, songsService) {
        var ctrl = this;

        ctrl.goToSong = goToSong;

        ctrl.$onInit = onInit;

        function onInit () {
            songsService.getSongs()
                .then(function (data) {
                    ctrl.songs = data;
                });
        }

        function goToSong (id) {
            $state.go('app.song', { id: id });
        }

    }
})();