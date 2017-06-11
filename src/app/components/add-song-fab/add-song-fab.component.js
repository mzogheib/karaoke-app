(function () {
    'use strict';

    angular
        .module('components')
        .component('addSongFab', Component());

    function Component () {

        return {
            controller: Controller,
            templateUrl: 'add-song-fab.html'
        };
    }

    function Controller ($state) {
        var ctrl = this;

        ctrl.addSong = addSong;

        function addSong () {
            $state.go('app.song', { id: 'new' });
        }
    }
})();