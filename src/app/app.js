(function () {
    'use strict';

    angular
        .module('karaokeApp', [
            'ui.router',
            'ngMaterial',

            'templates',
            'services',
            'routes',
            'components'
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
    }

    function ngMaterialConfig ($mdThemingProvider) {
        $mdThemingProvider
            .theme('default')
            .primaryPalette('indigo')
            .accentPalette('indigo');
    }
})();
