(function() {
    'use strict';

   angular.module('objectifDtyApp')

        .directive('ckEditor', function () {
           return {
             require: '?ngModel',
             link: function (scope, elm, attr, ngModel) {
               var ck = CKEDITOR.replace(elm[0]);
               if (!ngModel) return;
               ck.on('instanceReady', function () {
                 ck.setData(ngModel.$viewValue);
               });
               function updateModel() {
                 scope.$apply(function () {
                   ngModel.$setViewValue(ck.getData());
                 });
               }
               ck.on('change', updateModel);
               ck.on('key', updateModel);
               ck.on('dataReady', updateModel);
               ngModel.$render = function (value) {
                 ck.setData(ngModel.$viewValue);
               };
             }
           };
     });

     angular.module('objectifDtyApp')

        .controller('LessonDialogController', LessonDialogController);

    LessonDialogController.$inject = ['$timeout', '$scope', '$stateParams', '$uibModalInstance', 'DataUtils', 'entity', 'Lesson', 'Coach', 'Bloc', 'Question', 'Alert2Service'];

    function LessonDialogController ($timeout, $scope, $stateParams, $uibModalInstance, DataUtils, entity, Lesson, Coach, Bloc, Question, Alert2Service) {
        var vm = this;


        vm.lesson = entity;
        vm.clear = clear;
        vm.byteSize = DataUtils.byteSize;
        vm.openFile = DataUtils.openFile;
        vm.save = save;
        vm.coaches = Coach.query({page: vm.page, size: 10000});
        vm.blocs = Bloc.query({page: vm.page, size: 10000});
        vm.questions = Question.query({page: vm.page, size: 10000});

        $scope.editorOptions = {
            // settings more at http://docs.ckeditor.com/#!/guide/dev_configuration
        };


        $timeout(function (){
            angular.element('.form-group:eq(1)>input').focus();
        });

        function clear () {
            $uibModalInstance.dismiss('cancel');
        }

        /*
        /save edited in order to don't allow lessons to have the same leson_number
        /need to be edited to only check the lesson number and the block !
        / @ASK : alburkerk for questions
        */

        function save () {
            vm.isSaving = true;
            if (vm.lesson.id !== null) {
                Lesson.update(vm.lesson, onSaveSuccess, onSaveError);
            } else {
                var isPossible = true;
                var tout2 = Lesson.query();
                         tout2.$promise.then(function(data){
                                        for (var i = 0; i < data.length; i++) {
                                            console.log(data[i].bloc);
                                            console.log(vm.lesson.bloc);
                                            if((data[i].num_lesson === vm.lesson.num_lesson) && (data[i].bloc.id == vm.lesson.bloc.id)){
                                                isPossible = false;
                                            }//Changed data.data.topics to data.topics
                                        }
                                        if(isPossible){
                                               Lesson.save(vm.lesson, onSaveSuccess, onSaveError);
                                        } else { Alert2Service.error("This lesson number already exists for this bloc. Please enter another number");
                                                 vm.isSaving = false;}
                                        });
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
