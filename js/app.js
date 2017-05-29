(function () {
    'use strict';

    angular
        .module('karaokeApp', [
            'ui.router',
            'spotify',

            'services.songs',

            // Routes
            'component.addSong',
            'component.songs',

            'component.songSearch',
            'component.songsList'
        ])
        .config(config);

    function config ($stateProvider, $urlRouterProvider) {
        $stateProvider
            .state('app', {
                abstract: true,
                templateUrl: './js/app.html'
            });

        $urlRouterProvider
            .otherwise('/songs');
    }
})();
