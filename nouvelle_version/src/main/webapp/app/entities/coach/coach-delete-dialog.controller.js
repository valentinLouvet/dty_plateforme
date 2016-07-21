(function() {
    'use strict';

    angular
        .module('objectifDtyApp')
        .controller('CoachDeleteController',CoachDeleteController);

    CoachDeleteController.$inject = ['$uibModalInstance', 'entity', 'Coach'];

    function CoachDeleteController($uibModalInstance, entity, Coach) {
        var vm = this;

        vm.coach = entity;
        vm.clear = clear;
        vm.confirmDelete = confirmDelete;
        
        function clear () {
            $uibModalInstance.dismiss('cancel');
        }

        function confirmDelete (id) {
            Coach.delete({id: id},
                function () {
                    $uibModalInstance.close(true);
                });
        }
    }
})();
