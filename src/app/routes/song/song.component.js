(function () {
    'use strict';

    angular
        .module('routes')
        .config(Config)
        .component('song', Component());

    function Config ($stateProvider) {
        $stateProvider
            .state('app.song', {
                url: '/songs/:id',
                title: 'Song',
                template: '<song></song>'
            });
    }

    function Component () {
        return {
            controller: Controller,
            templateUrl: 'song.html',
            bindings: {
            }
        };
    }

    function Controller ($state, songsService) {
        var ctrl = this;

        ctrl.$onInit = onInit;

        function onInit () {
            ctrl.id = $state.params.id;
            ctrl.state = 'loading';

            songsService.getSongById(ctrl.id)
                .then(function (data) {
                    ctrl.song = data;
                    ctrl.state = 'ready';
                })
                .catch(function () {
                    console.error('Something went wrong!');
                });
        }
    }
})();