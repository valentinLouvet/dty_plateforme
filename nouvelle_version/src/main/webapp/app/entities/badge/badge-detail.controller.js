(function() {
    'use strict';

    angular
        .module('objectifDtyApp')
        .controller('BadgeDetailController', BadgeDetailController);

    BadgeDetailController.$inject = ['$scope', '$rootScope', '$stateParams', 'entity', 'Badge'];

    function BadgeDetailController($scope, $rootScope, $stateParams, entity, Badge) {
        var vm = this;

        vm.badge = entity;

        var unsubscribe = $rootScope.$on('objectifDtyApp:badgeUpdate', function(event, result) {
            vm.badge = result;
        });
        $scope.$on('$destroy', unsubscribe);
    }
})();
