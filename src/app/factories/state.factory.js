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

        function State () {
            this.state = States.READY;
        }

        State.prototype.setLoading = function () {
            this.state = States.LOADING;
        }

        State.prototype.setReady = function () {
            this.state = States.READY;
        }

        State.prototype.setError = function () {
            this.state = States.ERROR;
        }

        State.prototype.isLoading = function () {
            return this.state === States.LOADING;
        }

        State.prototype.isReady = function () {
            return this.state === States.READY;
        }

        State.prototype.isError = function () {
            return this.state === States.ERROR;
        }

        return State;
    }
})();
