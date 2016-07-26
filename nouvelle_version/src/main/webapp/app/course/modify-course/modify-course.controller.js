(function () {
   'use strict';

    angular
        .module('objectifDtyApp')
        .controller('courseModifyController',['$cookies', '$state', 'Lesson', function ($cookies, $state, Lesson) {
            var vm=this;
            vm.modifyCourse= false;
            vm.course=$cookies.getObject('course');
            vm.newContent=vm.course.content;
            console.log(vm.course);

            vm.changeCourse= function () {
                vm.modifyCourse = !vm.modifyCourse
            };

            vm.saveChanges = function () {
                vm.course.content = vm.newContent;
                vm.modifyCourse=false;
            };

            vm.saveCourse = function() {
                vm.isSaving = true;
                if (vm.course.id !== null) {
                    console.log(vm.course.id);
                    console.log("vm.newLesson.id !== null");
                    Lesson.update(vm.course, onSaveLessonSuccess, onSaveLessonError);
                } else {
                    console.log("vm.newLesson.id == null");
                    Lesson.save(vm.course, onSaveLessonSuccess, onSaveLessonError);
                }
                console.log(vm.course);
            };

            function onSaveLessonSuccess () {
                //$scope.$emit('objectifDtyApp:lessonUpdate', result);
                //$uibModalInstance.close(result);
                vm.isSaving = false;
                console.log("onSaveLessonSuccess");
            }

            function onSaveLessonError () {
                vm.isSaving = false;
                console.log("onSaveLessonError");
            }


        }])
})();
