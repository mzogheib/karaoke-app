(function () {
    'use strict';

    angular
        .module('karaokeApp', [
            'ui.router',
            'ngMaterial',

            'templates',
            'services',
            'factories',
            'routes',
            'components',
            'directives'
        ])
        .config(Config)
        .config(ngMaterialConfig);

    function Config ($stateProvider, $urlRouterProvider) {
        $stateProvider
            .state('app', {
                abstract: true,
                templateUrl: 'app.html'
            });

        $urlRouterProvider
            .otherwise('/songs');

        // Remove trailing slashes, which can confuse route id config
        $urlRouterProvider.rule(function ($injector, $location) {
            var path = $location.path();
            var hasTrailingSlash = path[path.length - 1] === '/';

            if (hasTrailingSlash) {
                return path.substr(0, path.length - 1);;
            }
        });
    }

    function ngMaterialConfig ($mdThemingProvider) {
        $mdThemingProvider
            .theme('default')
            .primaryPalette('indigo')
            .accentPalette('indigo');
    }
})();
