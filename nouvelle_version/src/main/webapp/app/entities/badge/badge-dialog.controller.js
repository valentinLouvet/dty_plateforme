(function() {
    'use strict';

    angular
        .module('objectifDtyApp')
        .controller('BadgeDialogController', BadgeDialogController);

    BadgeDialogController.$inject = ['$timeout', '$scope', '$stateParams', '$uibModalInstance', 'entity', 'Badge'];

    function BadgeDialogController ($timeout, $scope, $stateParams, $uibModalInstance, entity, Badge) {
        var vm = this;

        vm.badge = entity;
        vm.clear = clear;
        vm.save = save;

        $timeout(function (){
            angular.element('.form-group:eq(1)>input').focus();
        });

        function clear () {
            $uibModalInstance.dismiss('cancel');
        }

        function save () {
            vm.isSaving = true;
            if (vm.badge.id !== null) {
                Badge.update(vm.badge, onSaveSuccess, onSaveError);
            } else {
                Badge.save(vm.badge, onSaveSuccess, onSaveError);
            }
        }

        function onSaveSuccess (result) {
            $scope.$emit('objectifDtyApp:badgeUpdate', result);
            $uibModalInstance.close(result);
            vm.isSaving = false;
        }

        function onSaveError () {
            vm.isSaving = false;
        }


    }
})();
