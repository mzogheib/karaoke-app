(function () {
    'use strict';

    angular
        .module('component.songView', [
        ])
        .config(config);

    function config ($stateProvider) {
        $stateProvider
            .state('app.songView', {
                url: '/songs/:id',
                title: 'Song',
                template: '<song-view></song-view>'
            });
    }
})();
