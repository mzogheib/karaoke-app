(function () {
    'use strict';

    angular
        .module('components')
        .component('songViewer', component());

    function component () {

        return {
            controller: controller,
            templateUrl: 'songs-viewer.html',
            bindings: {
                song: '<'
            }
        };
    }

    function controller () {
        var ctrl = this;

        ctrl.$onInit = onInit;
        ctrl.$onChanges = onChanges;

        function onInit () {
        }

        function onChanges () {
        }
    }
})();