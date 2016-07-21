(function() {
    'use strict';

    angular
        .module('objectifDtyApp')
        .controller('ResponseDeleteController',ResponseDeleteController);

    ResponseDeleteController.$inject = ['$uibModalInstance', 'entity', 'Response'];

    function ResponseDeleteController($uibModalInstance, entity, Response) {
        var vm = this;

        vm.response = entity;
        vm.clear = clear;
        vm.confirmDelete = confirmDelete;
        
        function clear () {
            $uibModalInstance.dismiss('cancel');
        }

        function confirmDelete (id) {
            Response.delete({id: id},
                function () {
                    $uibModalInstance.close(true);
                });
        }
    }
})();
