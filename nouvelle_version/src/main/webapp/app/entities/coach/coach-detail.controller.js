(function() {
    'use strict';

    angular
        .module('objectifDtyApp')
        .controller('CoachDetailController', CoachDetailController);

    CoachDetailController.$inject = ['$scope', '$rootScope', '$stateParams', 'entity', 'Coach', 'User'];

    function CoachDetailController($scope, $rootScope, $stateParams, entity, Coach, User) {
        var vm = this;

        vm.coach = entity;

        var unsubscribe = $rootScope.$on('objectifDtyApp:coachUpdate', function(event, result) {
            vm.coach = result;
        });
        $scope.$on('$destroy', unsubscribe);
    }
})();
