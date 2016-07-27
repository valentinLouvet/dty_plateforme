(function(){

    angular.module('objectifDtyApp').controller('CourseViewController',ViewCourseController);

    ViewCourseController.$inject = ['Principal','courseView','$scope', '$rootScope', '$stateParams', 'DataUtils', 'Lesson', 'Coach', 'Bloc', 'Question', 'Lesson_done','Student'];

        function ViewCourseController(Principal,courseView,$scope,$rootScope,$stateParams,DataUtils,Lesson,Coach,Bloc,Question,Lesson_done,Student){
            var vm = this;
            vm.id=$stateParams.id;
            vm.lesson=Lesson.get({id: vm.id});
            vm.scoreCalc = false;
            vm.lessonDoneNew = true;

            vm.score = null;
            Student.query().$promise.then(function(data){
                vm.student = data;
            });
            Lesson_done.query().$promise.then(function(data){
                vm.lesson_dones = data;
            });

            vm.submitLesson = function(){

                vm.score = 0;
                for(i=0; i<vm.lesson.questions.length; i++){
                    if(vm.lesson.questions[i].score == "true"){
                        vm.score++;
                    }
                }
                vm.score *= 100;
                vm.score/=vm.lesson.questions.length;
                vm.score = parseInt(vm.score)
                console.log(vm.lesson_dones);

                vm.lesson_done = {
                    note_init : vm.score,
                    note_max : vm.score,
                    student : vm.student[0],
                    lessons : [vm.lesson]
                };
                for(i=0; i<vm.lesson_dones.length ;i++){
                    if(vm.lesson_dones[i].lessons[0].id == vm.lesson.id){
                        vm.lesson_done.id = vm.lesson_dones[i].id;
                        vm.lesson_done.note_init = vm.lesson_dones[i].note_init;
                        vm.lessonDoneNew = false;
                    }
                }



                vm.scoreCalc = true;
                save();

            };
            function save () {
                vm.isSaving = true;
                console.log(vm.lesson_done.id);
                if (vm.lesson_done.id !== null) {
                    Lesson_done.update(vm.lesson_done, onSaveSuccess, onSaveError);
                } else {
                    Lesson_done.save(vm.lesson_done, onSaveSuccess, onSaveError);
                }
            }

            function onSaveSuccess (result) {
                $scope.$emit('objectifDtyApp:lesson_doneUpdate', result);
                vm.isSaving = false;
                Student.query().$promise.then(function(data){
                    vm.student = data;
                });
            }

            function onSaveError () {
                vm.isSaving = false;
            }




        }
}());

//bcp de dépendances inutilisées mais qui pourront toutefois servir !
