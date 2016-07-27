(function(){

    angular.module('objectifDtyApp').controller('CourseViewController',ViewCourseController);

    ViewCourseController.$inject = ['Principal','courseView','$scope', '$rootScope', '$stateParams', 'DataUtils', 'Lesson', 'Coach', 'Bloc', 'Question', 'Lesson_done','Student'];

        function ViewCourseController(Principal,courseView,$scope,$rootScope,$stateParams,DataUtils,Lesson,Coach,Bloc,Question,Lesson_done,Student){
            var vm = this;
            vm.id=$stateParams.id;
            vm.lesson=Lesson.get({id: vm.id});
            vm.scoreCalc = false;

            vm.score = null;
            Student.query().$promise.then(function(data){
                vm.student = data;
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
                console.log(vm.student[0].lesson_dones);
                console.log(parseInt(vm.score));
                vm.lesson_done = {
                    note_init : parseInt(vm.score),
                    note_max : parseInt(vm.score),
                    student : vm.student[0],
                    lessons : [vm.lesson]
                };
                vm.scoreCalc = true;
                console.log(vm.lesson_done);
                save();

            };
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
                vm.isSaving = false;
                Student.query().$promise.then(function(data){
                    vm.student = data;
                    console.log(vm.student);
                });
            }

            function onSaveError () {
                vm.isSaving = false;
            }




        }
}());

//bcp de dépendances inutilisées mais qui pourront toutefois servir !
