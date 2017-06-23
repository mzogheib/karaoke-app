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

        ctrl.logout = logout;
        ctrl.goToSongs = goToSongs;

        function goToSongs () {
            $state.go('app.songs');
        }

        function logout () {
            userService.logout()
            .then(function () {
                $state.go('app.login');
            });;
        }
    }
})();