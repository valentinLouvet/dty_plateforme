(function() {
    'use strict';

    angular
        .module('objectifDtyApp')
        .controller('BadgeDeleteController',BadgeDeleteController);

    BadgeDeleteController.$inject = ['$uibModalInstance', 'entity', 'Badge'];

    function BadgeDeleteController($uibModalInstance, entity, Badge) {
        var vm = this;

        vm.badge = entity;
        vm.clear = clear;
        vm.confirmDelete = confirmDelete;
        
        function clear () {
            $uibModalInstance.dismiss('cancel');
        }

        function confirmDelete (id) {
            Badge.delete({id: id},
                function () {
                    $uibModalInstance.close(true);
                });
        }
    }
})();
