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
                params : {
                    id: {
                        dynamic: true
                    }
                },
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

            ctrl.isNew = ctrl.isEditing = ctrl.id === 'new';

            if(ctrl.isNew) {
                ctrl.song = songsService.initNewSong();
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
                        console.error('Could not load song');
                    });
            }
        }

        function save () {
            ctrl.headerState = 'loading';
            songsService.save(ctrl.song)
                .then(function (song) {
                    if (song) {
                        // Update the url with the new id
                        ctrl.id = song.id;
                        ctrl.isNew = false;
                        $state.go($state.current.name, { id: ctrl.id });
                    }
                    ctrl.isEditing = false;
                    ctrl.headerState = 'ready';
                })
                .catch(function () {
                    ctrl.headerState = 'ready';
                    console.error('Could not save song');
                });
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