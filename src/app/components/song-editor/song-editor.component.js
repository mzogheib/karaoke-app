(function () {
    'use strict';

    angular
        .module('components')
        .component('songEditor', Component());

    function Component () {

        return {
            controller: Controller,
            templateUrl: 'song-editor.html',
            bindings: {
                song: '<',
                artists: '<',
                onDelete: '&'
            }
        };

        function Controller () {
            var ctrl = this;

            ctrl.selectedArtist = null;
            ctrl.searchText = null;
            
            ctrl.$onInit = onInit;
            ctrl.querySearch = querySearch;
            ctrl.onArtistSelected = onArtistSelected;
            ctrl.onSearchTextChange = onSearchTextChange;

            function onInit () {
                ctrl.artists = ctrl.artists || [];
                _.forEach(ctrl.artists, function (artist) {
                    artist.nameLowercase = angular.lowercase(artist.name);
                });

                ctrl.selectedArtist = _.find(ctrl.artists, { _id: ctrl.song.artistId });
            }

            function queryFilter (query) {
                var lowercaseQuery = angular.lowercase(query);

                return function filterFn (artist) {
                    return (artist.nameLowercase.indexOf(lowercaseQuery) === 0);
                };
            }

            function querySearch (query) {
                return query ? ctrl.artists.filter(queryFilter(query)) : ctrl.artists;
            }

            function onArtistSelected () {
                if (!ctrl.selectedArtist) {
                    ctrl.song.artistId = null;
                    ctrl.song.artistName = ctrl.searchText;
                } else {
                    ctrl.song.artistId = ctrl.selectedArtist._id;
                    ctrl.song.artistName = ctrl.selectedArtist.name;
                }
            }

            function onSearchTextChange () {
                if (!ctrl.selectedArtist) {
                    ctrl.song.artistId = null;
                    ctrl.song.artistName = ctrl.searchText;
                }
            }
        }

    }
})();