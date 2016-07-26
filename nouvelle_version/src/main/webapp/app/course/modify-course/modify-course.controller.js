(function () {
   'use strict';

    /*
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
        }); */
    angular.module('objectifDtyApp')
        .controller('courseModifyController',['$cookies', '$state', 'Lesson', function ($cookies, $state, Lesson) {
            var vm=this;
            vm.modifyCourse= false;
            vm.course=$cookies.getObject('course');
            vm.newContent=vm.course.cours;

            //active le champ de texte pour modifier la partie cours
            vm.changeCourse= function () {
                vm.modifyCourse = !vm.modifyCourse
            };

            //sauvegarde les changements de la partie texte
            vm.saveChanges = function () {
                vm.course.cours = vm.newContent;
                vm.modifyCourse=false;
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
