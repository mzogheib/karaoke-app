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
                template: '<songs></songs>',
                data: {
                    authRequired: true
                }
            });
    }

    function Component () {
        return {
            controller: Controller,
            templateUrl: 'songs.html'
        };
    }

    function Controller ($state, stateFactory, songsService) {
        var ctrl = this;

        ctrl.goToSong = goToSong;

        ctrl.$onInit = onInit;

        function onInit () {
            ctrl.state = new stateFactory('main');
            ctrl.state.setLoading();
            songsService.getSongs()
                .then(function (data) {
                    ctrl.songs = data;
                    ctrl.state.setReady();
                })
                .catch(function (error) {
                    console.error('Could not load songs', error);
                    ctrl.state.setError();
            });
        }

        function goToSong (id) {
            $state.go('app.song', { id: id });
        }

    }
})();