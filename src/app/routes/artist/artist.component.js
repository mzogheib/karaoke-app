(function () {
    'use strict';

    angular
        .module('routes')
        .config(Config)
        .component('artist', Component());

    function Config ($stateProvider) {
        $stateProvider
            .state('app.artist', {
                url: '/artists/:id',
                params : {
                    id: {
                        dynamic: true
                    }
                },
                title: 'Artist',
                template: '<artist></artist>',
                data: {
                    authRequired: true
                }
            });
    }

    function Component () {
        return {
            controller: Controller,
            templateUrl: 'artist.html'
        };
    }

    function Controller ($state, stateFactory, artistsService) {
        var ctrl = this;

        ctrl.delete = deleteArtist;
        ctrl.getHeaderRightText = getHeaderRightText;
        ctrl.headerRightButtonClick = headerRightButtonClick;

        ctrl.$onInit = onInit;

        function onInit () {
            ctrl.state = new stateFactory('main');
            ctrl.headerState = new stateFactory('header');
            ctrl.id = $state.params.id;

            ctrl.state.setLoading();
            artistsService.getArtistById(ctrl.id)
                .then(function (data) {
                    ctrl.artist = data;
                    ctrl.state.setReady();
                })
                .catch(function () {
                    console.error('Could not load artist');
                    ctrl.state.setError();
                });
        }

        function save () {
            ctrl.headerState.setLoading();
            artistsService.save(ctrl.artist)
                .then(function () {
                    ctrl.isEditing = false;
                })
                .catch(function () {
                    console.error('Could not save artist');
                })
                .finally(function () {
                    ctrl.headerState.setReady();
                });
        }


        function deleteArtist (id) {
            ctrl.headerState.setLoading();
            artistsService.delete(id)
                .then(function () {
                    $state.go('app.artists');
                })
                .catch(function () {
                    console.error('Could not delete artist');
                })
                .finally(function () {
                    ctrl.headerState.setReady();
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