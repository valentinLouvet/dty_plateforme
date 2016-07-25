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

            vm.saveCourse = function () {
                //$state.go('lesson.edit({id: vm.course.id})')
                $state.go('lesson.create')
            }


        }])
})();
