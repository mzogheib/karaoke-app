(function () {
    'use strict';

    angular
        .module('routes')
        .config(Config)
        .component('song', Component());

    function Config ($stateProvider) {
        $stateProvider
            .state('app.song', {
                url: '/songs/:id',
                title: 'Song',
                template: '<song></song>'
            });
    }

    function Component () {
        return {
            controller: Controller,
            templateUrl: 'song.html',
            bindings: {
            }
        };
    }

    function Controller ($timeout, $state, songsService) {
        var ctrl = this;

        ctrl.save = save;
        ctrl.getHeaderRightText = getHeaderRightText;
        ctrl.headerRightButtonClick = headerRightButtonClick;
        ctrl.isLoading = isLoading;
        ctrl.isReady = isReady;
        ctrl.isError = isError;

        ctrl.$onInit = onInit;

        function onInit () {
            ctrl.state = 'loading';
            ctrl.id = $state.params.id;

            ctrl.isEditing = ctrl.id === 'new';

            if(ctrl.id === 'new') {
                ctrl.song = {};
                ctrl.state = 'ready';
                ctrl.headerState = 'ready';
            } else {
                songsService.getSongById(ctrl.id)
                    .then(function (data) {
                        ctrl.song = data;
                        ctrl.state = 'ready';
                    })
                    .catch(function () {
                        ctrl.state = 'error';
                        console.error('Something went wrong!');
                    });
            }
        }

        function save (song) {
            ctrl.headerState = 'loading';
            $timeout(function () {
                ctrl.isEditing = false;
                ctrl.headerState = 'ready';
            }, 1000);
        }

        function edit () {
            ctrl.isEditing = true;
        }

        function getHeaderRightText () {
            return ctrl.isEditing ? 'Save' : 'Edit';
        }

        function headerRightButtonClick () {
            ctrl.isEditing ? save() : edit();
        }

        function isLoading () {
            return ctrl.state === 'loading';
        }

        function isReady () {
            return ctrl.state === 'ready';
        }

        function isError () {
            return ctrl.state === 'error';
        }
    }
})();