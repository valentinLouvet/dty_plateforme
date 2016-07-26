(function () {
    'use strict';

    angular
        .module('objectifDtyApp')
        .controller('courseModifyController',['Principal', 'DataUtils', 'courseView', '$state', 'Lesson','AlertService', 'Bloc', function (Principal, DataUtils, courseView, $state, Lesson, AlertService, Bloc) {

            var vm=this;
            vm.modifyCourse= false;
            vm.blocs= [];

            console.log(vm.id);
            vm.course= courseView;
            console.log(vm.course);
            console.log(courseView);

            vm.newContent=vm.course.cours;
            vm.nbreLesson = vm.course.questions.length;
            vm.compteurQuestion=0;
            vm.questions= [];

            vm.addCompteur = function(i){
                vm.compteurQuestion = vm.compteurQuestion + i;
            };

            //active le champ de texte pour modifier la partie cours
            vm.changeCourse= function () {
                vm.modifyCourse = !vm.modifyCourse
            };

            //sauvegarde les changements de la partie texte
            vm.saveChanges = function () {
                vm.course.cours = vm.newContent;
                vm.modifyCourse=false;
            };

            vm.editQuestion = function () {
                vm.compteurQuestion = vm.compteurQuestion - vm.nbreLesson;
                vm.questions[vm.compteurQuestion] = false;
                console.log(vm.questions)
            };

            //enregistre la lesson dans la BDD
            vm.saveCourse = function() {
                vm.isSaving = true;
                if (vm.course.id !== null) {
                    console.log(vm.course.id);
                    console.log("vm.course.id !== null");
                    Lesson.update(vm.course, onSaveLessonSuccess, onSaveLessonError);
                } else {
                    console.log("vm.course.id == null");
                    Lesson.save(vm.course, onSaveLessonSuccess, onSaveLessonError);
                }
                console.log(vm.course);
            };

            function onSaveLessonSuccess () {
                //$scope.$emit('objectifDtyApp:lessonUpdate', result);
                //$uibModalInstance.close(result);
                vm.isSaving = false;
                console.log("onSaveLessonSuccess");
                $state.go('editCourse')
            }

            function onSaveLessonError () {
                vm.isSaving = false;
                console.log("onSaveLessonError");
            }


        }])
})();
