(function() {
    'use strict';

    angular
        .module('objectifDtyApp')
        .controller('BadgeController',BadgeController);

    BadgeController.$inject = ['$uibModalInstance', '$state', '$stateParams'];

    function BadgeController($uibModalInstance, $state, $stateParams) {
        var vm = this;




        function clear () {
            $uibModalInstance.dismiss('cancel');
        }

        vm.close = function() {

           $uibModalInstance.close(true);
          $state.go('viewCourse', {id: $stateParams.idLesson});
        }
    }
})();
