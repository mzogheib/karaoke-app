(function () {
    'use strict';

    angular
        .module('routes')
        .config(Config)
        .component('songs', Component());

    function Config ($stateProvider) {
        $stateProvider
            .state('app.songs', {
                url: '/songs',
                title: 'My Songs',
                template: '<songs></songs>'
            });
    }

    function Component () {
        return {
            controller: Controller,
            templateUrl: 'songs.html',
            bindings: {}
        };
    }

    function Controller ($state, songsService) {
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