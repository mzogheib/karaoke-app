(function () {
    'use strict';

    angular
        .module('routes')
        .config(config)
        .component('songs', component());

    function config ($stateProvider) {
        $stateProvider
            .state('app.songs', {
                url: '/songs',
                title: 'My Songs',
                template: '<songs></songs>'
            });
    }

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