(function () {
    'use strict';

    angular
        .module('component.songs', [
        ])
        .config(config);

    function config ($stateProvider) {
        $stateProvider
            .state('app.songs', {
                url: '/songs',
                template: '<songs></songs>'
            });
    }
})();
