(function() {
    'use strict';

    angular
        .module('objectifDtyApp')
        .controller('BlocDialogController', BlocDialogController);

    BlocDialogController.$inject = ['$timeout', '$scope', '$stateParams', '$uibModalInstance', 'entity', 'Bloc', 'Lesson'];

    function BlocDialogController ($timeout, $scope, $stateParams, $uibModalInstance, entity, Bloc, Lesson) {
        var vm = this;

        vm.bloc = entity;
        vm.clear = clear;
        vm.save = save;
        vm.lessons = Lesson.query();
        vm.blocs = Bloc.query();

        $timeout(function (){
            angular.element('.form-group:eq(1)>input').focus();
        });

        function clear () {
            $uibModalInstance.dismiss('cancel');
        }

        function save () {
            vm.isSaving = true;
            if (vm.bloc.id !== null) {
                Bloc.update(vm.bloc, onSaveSuccess, onSaveError);
            } else {
                Bloc.save(vm.bloc, onSaveSuccess, onSaveError);
            }
        }

        function onSaveSuccess (result) {
            $scope.$emit('objectifDtyApp:blocUpdate', result);
            $uibModalInstance.close(result);
            vm.isSaving = false;
        }

        function onSaveError () {
            vm.isSaving = false;
        }


    }
})();
