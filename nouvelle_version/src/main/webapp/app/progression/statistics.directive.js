(function() {
    'use strict';

    angular
        .module('objectifDtyApp')
        .directive('statistics', function () {
            return{
                restrict: 'E',
                templateUrl: '/app/progression/statistics.html'
            }
        });
})();

