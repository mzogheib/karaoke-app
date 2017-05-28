(function () {
    'use strict';

    angular
        .module('services.songs', [])
        .service('songsService', service);

    function service () {
        this.getSongs = function () {
            return ['one', 'two', 'three'];
        }
    }
})();
