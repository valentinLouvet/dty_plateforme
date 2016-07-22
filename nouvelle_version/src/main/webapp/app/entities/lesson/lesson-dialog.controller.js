(function() {
    'use strict';

    angular
        .module('objectifDtyApp')
        .controller('LessonDialogController', LessonDialogController);

    LessonDialogController.$inject = ['$timeout', '$scope', '$stateParams', '$uibModalInstance', 'DataUtils', 'entity', 'Lesson', 'Coach', 'Bloc', 'Question'];

    function LessonDialogController ($timeout, $scope, $stateParams, $uibModalInstance, DataUtils, entity, Lesson, Coach, Bloc, Question) {
        var vm = this;


        $scope.lesson = entity;
        vm.clear = clear;
        vm.byteSize = DataUtils.byteSize;
        vm.openFile = DataUtils.openFile;
        vm.save = save;
        vm.coaches = Coach.query();
        vm.blocs = Bloc.query();
        vm.questions = Question.query();

        $timeout(function (){
            angular.element('.form-group:eq(1)>input').focus();
        });

        function clear () {
            $uibModalInstance.dismiss('cancel');
        }

        function save () {
            vm.isSaving = true;
            if ($scope.lesson.id !== null) {
                Lesson.update($scope.lesson, onSaveSuccess, onSaveError);
            } else {
                Lesson.save($scope.lesson, onSaveSuccess, onSaveError);
            }
        }

        function onSaveSuccess (result) {
            $scope.$emit('objectifDtyApp:lessonUpdate', result);
            $uibModalInstance.close(result);
            vm.isSaving = false;
        }

        function onSaveError () {
            vm.isSaving = false;
        }


    }
})();
