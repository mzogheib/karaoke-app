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
        .config(ngMaterialConfig)
        .run(Run);

    function Config ($stateProvider, $urlRouterProvider, $httpProvider) {
        $httpProvider.interceptors.push('authInterceptorService');

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

    function Run ($transitions, authService) {
        // If not logged in, redirect to login. If logged in, skip login or sign-up
        $transitions.onStart({ to: 'app.**' }, function (trans) {
            var $state = trans.router.stateService;
            var isLoggedIn = !!authService.getAuth();
            if (!isLoggedIn) {
                $state.go('app.login');
            } else if (_.includes(['app.login', 'app.signUp'], trans.$to().name)) {
                $state.go('app.songs')
            }
        });
    }
})();
