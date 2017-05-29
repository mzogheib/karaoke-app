(function () {
    'use strict';

    angular
        .module('component.songSearch')
        .component('songSearch', component());

    function component () {

        return {
            controller: controller,
            templateUrl: './app/components/song-search/song-search.html',
            bindings: {
                onSubmit: '&'
            }
        };
    }

    function controller () {
        var ctrl = this;

        ctrl.submit = submit;

        ctrl.$onInit = onInit;

        function onInit () {
            console.log('songs-search controller');
        }

        function submit () {
            ctrl.onSubmit({ query: ctrl.query });
        }
    }
})();