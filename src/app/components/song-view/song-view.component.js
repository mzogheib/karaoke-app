(function () {
    'use strict';

    angular
        .module('component.songView')
        .component('songView', component());

    function component () {
        return {
            controller: controller,
            templateUrl: 'song-view.html',
            bindings: {
            }
        };
    }

    function controller ($state, songsService) {
        var ctrl = this;

        ctrl.$onInit = onInit;

        function onInit () {
            ctrl.id = $state.params.id;
            songsService.getSongById(ctrl.id)
                .then(function (data) {
                    ctrl.song = data;
                })
                .catch(function () {
                    console.error('Something went wrong!');
                });
        }
    }
})();