(function () {
    'use strict';

    angular
        .module('karaokeApp', [
            'ui.router',

            'services.songs',

            'component.songs',
            'component.songsList'
        ])
        .config(config);

    function config ($stateProvider, $urlRouterProvider) {
        $stateProvider
            .state('app', {
                abstract: true,
                template: '<p>NAVIGATION PLACEHOLDER</p><div ui-view></div>'
            });

        $urlRouterProvider
            .otherwise('/songs');
    }
})();
