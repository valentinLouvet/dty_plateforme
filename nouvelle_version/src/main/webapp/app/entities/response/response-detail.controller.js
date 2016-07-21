(function() {
    'use strict';

    angular
        .module('objectifDtyApp')
        .controller('ResponseDetailController', ResponseDetailController);

    ResponseDetailController.$inject = ['$scope', '$rootScope', '$stateParams', 'entity', 'Response', 'Question'];

    function ResponseDetailController($scope, $rootScope, $stateParams, entity, Response, Question) {
        var vm = this;

        vm.response = entity;

        var unsubscribe = $rootScope.$on('objectifDtyApp:responseUpdate', function(event, result) {
            vm.response = result;
        });
        $scope.$on('$destroy', unsubscribe);
    }
})();
