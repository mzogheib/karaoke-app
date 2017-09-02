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
                template: '<song></song>',
                data: {
                    authRequired: true
                }
            });
    }

    function Component () {
        return {
            controller: Controller,
            templateUrl: 'song.html'
        };
    }

    function Controller ($state, stateFactory, songsService, artistsService) {
        var ctrl = this;

        ctrl.save = save;
        ctrl.delete = deleteSong;
        ctrl.getHeaderRightText = getHeaderRightText;
        ctrl.headerRightButtonClick = headerRightButtonClick;

        ctrl.$onInit = onInit;

        function onInit () {
            ctrl.state = new stateFactory('main');
            ctrl.headerState = new stateFactory('header');
            ctrl.id = $state.params.id;

            ctrl.isNew = ctrl.id === 'new';

            if(ctrl.isNew) {
                ctrl.song = songsService.initNewSong();
                getArtists();
            } else {
                ctrl.state.setLoading();
                songsService.getSongById(ctrl.id)
                    .then(function (data) {
                        ctrl.song = data;
                        ctrl.state.setReady();
                    })
                    .catch(function (error) {
                        console.error('Could not load song', error);
                        ctrl.state.setError();
                    });
            }
        }

        function save () {
            ctrl.headerState.setLoading();
            var action = ctrl.song._id ? 'update' : 'create';

            songsService.save(ctrl.song)
                .then(function (song) {
                    ctrl.song = song;
                    if (action === 'create') {
                        // Update the url with the new id
                        ctrl.id = ctrl.song._id;
                        ctrl.isNew = false;
                        $state.go($state.current.name, { id: ctrl.id });
                    }
                    ctrl.isEditing = false;
                })
                .catch(function () {
                    console.error('Could not save song');
                })
                .finally(function () {
                    ctrl.headerState.setReady();
                });
        }

        function deleteSong (id) {
            ctrl.headerState.setLoading();
            songsService.delete(id)
                .then(function () {
                    $state.go('app.songs');
                })
                .catch(function () {
                    console.error('Could not delete song');
                })
                .finally(function () {
                    ctrl.headerState.setReady();
                });
        }

        function edit () {
            getArtists();
        }
        
        function getArtists () {
            ctrl.headerState.setLoading();
            ctrl.state.setLoading();
            artistsService.getArtists()
                .then(function (data) {
                    ctrl.artists = data;
                    ctrl.isEditing = true;
                })
                .catch(function () {
                    console.error('Could not delete song');
                })
                .finally(function () {
                    ctrl.headerState.setReady();
                    ctrl.state.setReady();
                });
        }

        function getHeaderRightText () {
            return ctrl.isEditing ? 'Save' : 'Edit';
        }

        function headerRightButtonClick () {
            ctrl.isEditing ? save() : edit();
        }
    }
})();