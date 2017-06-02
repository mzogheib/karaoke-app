(function () {
    'use strict';

    angular
        .module('component.addSong', [
        ])
        .config(config);

    function config ($stateProvider) {
        $stateProvider
            .state('app.addSong', {
                url: '/add-song',
                title: 'Add Song',
                template: '<add-song></add-song>'
            });
    }
})();
