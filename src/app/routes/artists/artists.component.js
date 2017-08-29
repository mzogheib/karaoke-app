(function () {
    'use strict';

    angular
        .module('routes')
        .config(Config)
        .component('artists', Component());

    function Config ($stateProvider) {
        $stateProvider
            .state('app.artists', {
                url: '/artists',
                title: 'Artists',
                template: '<artists></artists>',
                data: {
                    authRequired: true
                }
            });
    }

    function Component () {
        return {
            controller: Controller,
            templateUrl: 'artists.html'
        };
    }

    function Controller ($state, artistsService) {
        var ctrl = this;

        ctrl.goToArtist = goToArtist;

        ctrl.$onInit = onInit;

        function onInit () {
            artistsService.getArtists()
                .then(function (data) {
                    ctrl.artists = data;
                });
        }

        function goToArtist (id) {
            $state.go('app.artist', { id: id });
        }

    }
})();