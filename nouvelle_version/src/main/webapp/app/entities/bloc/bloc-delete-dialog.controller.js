(function() {
    'use strict';

    angular
        .module('objectifDtyApp')
        .controller('BlocDeleteController',BlocDeleteController);

    BlocDeleteController.$inject = ['$uibModalInstance', 'entity', 'Bloc'];

    function BlocDeleteController($uibModalInstance, entity, Bloc) {
        var vm = this;

        vm.bloc = entity;
        vm.clear = clear;
        vm.confirmDelete = confirmDelete;
        
        function clear () {
            $uibModalInstance.dismiss('cancel');
        }

        function confirmDelete (id) {
            Bloc.delete({id: id},
                function () {
                    $uibModalInstance.close(true);
                });
        }
    }
})();
