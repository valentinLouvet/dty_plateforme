(function() {
    'use strict';

    angular
        .module('objectifDtyApp')
        .directive('dtyFooter', function () {
            return{
                restrict: 'E',
                templateUrl: '/app/layouts/footer/footer.html'
            }
        });
})();
