(function () {
    'use strict';

    angular
        .module('components')
        .component('songEditor', Component());

    function Component () {

        return {
            controller: Controller,
            templateUrl: 'song-editor.html',
            bindings: {
                song: '<',
                onSave: '&'
            }
        };
    }

    function Controller () {
        var ctrl = this;
    }
})();