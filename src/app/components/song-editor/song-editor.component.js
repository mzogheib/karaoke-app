(function () {
    'use strict';

    angular
        .module('components')
        .component('songEditor', Component());

    function Component () {

        return {
            templateUrl: 'song-editor.html',
            bindings: {
                song: '<',
                onDelete: '&'
            }
        };

    }
})();