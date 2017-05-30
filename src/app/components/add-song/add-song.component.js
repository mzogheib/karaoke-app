(function () {
    'use strict';

    angular
        .module('component.addSong')
        .component('addSong', component());

    function component () {
        return {
            controller: controller,
            templateUrl: 'templates/components/add-song/add-song.html',
            bindings: {

            }
        };
    }

    function controller (songsService) {
        console.log('add-song controller');

        var ctrl = this;

        ctrl.search = search;
        ctrl.addToLibrary = addToLibrary;

        ctrl.$onInit = onInit;

        function onInit () {
            ctrl.songs = [];
        }

        function search (query) {
            songsService.searchSongsProvider(query)
                .then(function (data) {
                    ctrl.songs = data.data.tracks.items;
                });
        }

        function addToLibrary (song) {
            console.log('addToLibrary', song);
            songsService.addToLibrary(song);
        }
    }
})();