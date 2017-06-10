(function () {
    'use strict';

    angular
        .module('karaokeApp', [
            'ui.router',
            'ngMaterial',

            'templates',

            'services.songs',

            // Routes
            'routes',

            // Shared components
            'component.header',
            'component.songsList',
            'component.songViewer'
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
