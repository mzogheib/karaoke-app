(function () {
    'use strict';

    angular
        .module('component.song', [
        ])
        .config(config);

    function config ($stateProvider) {
        $stateProvider
            .state('app.song', {
                url: '/songs/:id',
                title: 'Song',
                template: '<song></song>'
            });
    }
})();
