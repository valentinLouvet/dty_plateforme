(function() {
    'use strict';

    angular
        .module('objectifDtyApp')
        .controller('Lesson_doneDialogController', Lesson_doneDialogController);

    Lesson_doneDialogController.$inject = ['$timeout', '$scope', '$stateParams', '$uibModalInstance', 'entity', 'Lesson_done', 'Student', 'Lesson'];

    function Lesson_doneDialogController ($timeout, $scope, $stateParams, $uibModalInstance, entity, Lesson_done, Student, Lesson) {
        var vm = this;

        vm.lesson_done = entity;
        vm.clear = clear;
        vm.save = save;
        vm.students = Student.query();
        vm.lessons = Lesson.query();

        $timeout(function (){
            angular.element('.form-group:eq(1)>input').focus();
        });

        function clear () {
            $uibModalInstance.dismiss('cancel');
        }

        function save () {
            vm.isSaving = true;
            if (vm.lesson_done.id !== null) {
                Lesson_done.update(vm.lesson_done, onSaveSuccess, onSaveError);
            } else {
                Lesson_done.save(vm.lesson_done, onSaveSuccess, onSaveError);
            }
        }

        function onSaveSuccess (result) {
            $scope.$emit('objectifDtyApp:lesson_doneUpdate', result);
            $uibModalInstance.close(result);
            vm.isSaving = false;
        }

        function onSaveError () {
            vm.isSaving = false;
        }


    }
})();
