(function () {
    'use strict';

    angular
        .module('components')
        .component('artistViewer', Component());

    function Component () {

        return {
            controller: Controller,
            templateUrl: 'artist-viewer.html',
            bindings: {
                artist: '<'
            }
        };
    }

    function Controller ($state) {
        var ctrl = this;

        ctrl.goToSong = goToSong;

        function goToSong (id) {
            $state.go('app.song', { id: id });
        }
    }
})();