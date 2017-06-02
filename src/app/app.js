(function () {
    'use strict';

    angular
        .module('karaokeApp', [
            'ui.router',
            'ngMaterial',

            'templates',

            'services.songs',

            // Routes
            'component.addSong',
            'component.songs',

            'component.header',
            'component.songSearch',
            'component.songsList'
        ])
        .config(config)
        .config(ngMaterialConfig);

    function config ($stateProvider, $urlRouterProvider) {
        $stateProvider
            .state('app', {
                abstract: true,
                templateUrl: 'app.html'
            });

        $urlRouterProvider
            .otherwise('/songs');
    }

    function ngMaterialConfig ($mdThemingProvider) {
        $mdThemingProvider
            .theme('default')
            .primaryPalette('brown')
            .accentPalette('red');
    }
})();
