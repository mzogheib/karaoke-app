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

    function controller (songsService) {
        var ctrl = this;

        ctrl.$onInit = onInit;

        function onInit () {
            songsService.getSongs()
                .then(function (data) {
                    console.log(data);
                    ctrl.songs = data;
                });
        }

    }
})();