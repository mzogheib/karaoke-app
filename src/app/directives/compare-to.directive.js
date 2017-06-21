(function () {
    'use strict';

    angular
        .module('directives')
        .directive('compareTo', Directive);

    function Directive() {
        return {
            restrict: 'A',
            require: 'ngModel',
            scope: {
                compareAgainst: '=compareTo'
            },
            link: link
        };

        function link (scope, elem, attrs, ctrl) {
            ctrl.$validators.compareTo = function (input) {
                return input === scope.compareAgainst;
            };

            scope.$watch('compareAgainst', function () {
                ctrl.$validate();
            });
        }
    }
})();
