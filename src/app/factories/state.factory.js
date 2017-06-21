(function () {
    'use strict';

    angular
        .module('factories')
        .factory('stateFactory', Factory);

    function Factory () {

        var States = {
            LOADING: 'loading',
            ERROR: 'error',
            READY: 'ready'
        };

        var state;

        function State (initialState) {
            state = initialState || States.READY;
        }

        State.prototype.setLoading = function () {
            state = States.LOADING;
        }

        State.prototype.setReady = function () {
            state = States.READY;
        }

        State.prototype.setError = function () {
            state = States.ERROR;
        }

        State.prototype.isLoading = function () {
            return state === States.LOADING;
        }

        State.prototype.isReady = function () {
            return state === States.READY;
        }

        State.prototype.isError = function () {
            return state === States.ERROR;
        }

        return State;
    }
})();
