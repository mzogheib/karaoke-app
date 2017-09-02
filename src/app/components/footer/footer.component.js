(function () {
    'use strict';

    angular
        .module('components')
        .component('footer', Component());

    function Component () {

        return {
            controller: Controller,
            templateUrl: 'footer.html'
        };
    }

    function Controller ($state, userService) {
        var ctrl = this;

        ctrl.goToSongs = goToSongs;
        ctrl.goToArtists = goToArtists;
        ctrl.logout = logout;
        
        function goToSongs () {
            $state.go('app.songs');
        }

        function goToArtists () {
            $state.go('app.artists');
        }

        function logout () {
            userService
                .logout()
                .then(function () {
                    $state.go('app.login');
                });;
        }
    }
})();