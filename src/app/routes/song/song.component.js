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

    function Controller ($state, stateFactory, songsService) {
        var ctrl = this;

        ctrl.save = save;
        ctrl.getHeaderRightText = getHeaderRightText;
        ctrl.headerRightButtonClick = headerRightButtonClick;

        ctrl.$onInit = onInit;

        function onInit () {
            ctrl.state = new stateFactory('main');
            ctrl.headerState = new stateFactory('header');
            ctrl.id = $state.params.id;

            ctrl.isNew = ctrl.isEditing = ctrl.id === 'new';

            if(ctrl.isNew) {
                ctrl.song = songsService.initNewSong();
            } else {
                ctrl.state.setLoading();
                songsService.getSongById(ctrl.id)
                    .then(function (data) {
                        ctrl.song = data;
                        ctrl.state.setReady();
                    })
                    .catch(function () {
                        ctrl.state.setError();
                        console.error('Could not load song');
                    });
            }
        }

        function save () {
            ctrl.headerState.setLoading();
            songsService.save(ctrl.song)
                .then(function (song) {
                    if (song.data) {
                        // Update the url with the new id
                        ctrl.id = song.data._id;
                        ctrl.isNew = false;
                        $state.go($state.current.name, { id: ctrl.id });
                    }
                    ctrl.isEditing = false;
                    ctrl.headerState.setReady();
                })
                .catch(function () {
                    ctrl.headerState.setReady();
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
    }
})();