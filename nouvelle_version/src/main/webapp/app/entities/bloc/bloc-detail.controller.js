(function() {
    'use strict';

    angular
        .module('objectifDtyApp')
        .controller('BlocDetailController', BlocDetailController);

    BlocDetailController.$inject = ['$scope', '$rootScope', '$stateParams', 'entity', 'Bloc', 'Lesson', 'Image'];

    function BlocDetailController($scope, $rootScope, $stateParams, entity, Bloc, Lesson, Image) {
        var vm = this;

        vm.bloc = entity;

        var unsubscribe = $rootScope.$on('objectifDtyApp:blocUpdate', function(event, result) {
            vm.bloc = result;
        });
        $scope.$on('$destroy', unsubscribe);
    }
})();
