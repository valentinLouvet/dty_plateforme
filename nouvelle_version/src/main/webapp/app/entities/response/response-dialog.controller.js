(function() {
    'use strict';

    angular
        .module('objectifDtyApp')
        .controller('ResponseDialogController', ResponseDialogController);

    ResponseDialogController.$inject = ['$timeout', '$scope', '$stateParams', '$uibModalInstance', 'entity', 'Response', 'Question'];

    function ResponseDialogController ($timeout, $scope, $stateParams, $uibModalInstance, entity, Response, Question) {
        var vm = this;

        vm.response = entity;
        vm.clear = clear;
        vm.save = save;
        vm.questions = Question.query();

        $timeout(function (){
            angular.element('.form-group:eq(1)>input').focus();
        });

        function clear () {
            $uibModalInstance.dismiss('cancel');
        }

        function save () {
            vm.isSaving = true;
            if (vm.response.id !== null) {
                Response.update(vm.response, onSaveSuccess, onSaveError);
            } else {
                Response.save(vm.response, onSaveSuccess, onSaveError);
            }
        }

        function onSaveSuccess (result) {
            $scope.$emit('objectifDtyApp:responseUpdate', result);
            $uibModalInstance.close(result);
            vm.isSaving = false;
        }

        function onSaveError () {
            vm.isSaving = false;
        }


    }
})();
