(function () {
    'use strict';

    angular
        .module('components')
        .component('artistEditor', Component());

    function Component () {

        return {
            templateUrl: 'artist-editor.html',
            bindings: {
                artist: '<',
                onDelete: '&'
            }
        };

    }
})();