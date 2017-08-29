(function () {
    'use strict';

    angular
        .module('components')
        .component('artistsList', Component());

    function Component () {

        return {
            controller: Controller,
            templateUrl: 'artists-list.html',
            bindings: {
                artists: '<',
                onRowClick: '&'
            }
        };

        function Controller () {
            var ctrl = this;

            ctrl.songsLabel = songsLabel;

            function songsLabel (songs) {
                var numSongs = songs.length;
                return numSongs + (numSongs === 1 ? ' song' : ' songs');
            }
        }
    }
})();