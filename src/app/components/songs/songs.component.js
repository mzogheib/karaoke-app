(function () {
    'use strict';

    angular
        .module('component.songs')
        .component('songs', component());

    function component () {
        return {
            controller: controller,
            templateUrl: 'templates/components/songs/songs.html',
            bindings: {}
        };
    }

    function controller (songsService) {
        console.log('songs controller');

        var ctrl = this;

        ctrl.search = search;

        ctrl.$onInit = onInit;

        function onInit () {
            ctrl.songs = songsService.getSongs();
        }

        function search (query) {
            songsService.searchLibrary(query)
                .then(function (data) {
                    console.log(data)
                });
        }
    }
})();