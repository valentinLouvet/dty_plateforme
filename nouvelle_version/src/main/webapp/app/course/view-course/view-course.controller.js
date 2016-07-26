(function(){

    angular.module('objectifDtyApp').controller('CourseViewController',ViewCourseController);

    ViewCourseController.$inject = ['Principal','courseView','$scope', '$rootScope', '$stateParams', 'DataUtils', 'Lesson', 'Coach', 'Bloc', 'Question', 'Lesson_done'];

        function ViewCourseController(Principal,courseView,$scope,$rootScope,$stateParams,DataUtils,Lesson,Coach,Bloc,Question,Lesson_done){
            var vm = this;
            vm.id=$stateParams.id;
            vm.lesson=Lesson.get({id: vm.id});

            vm.score = null;

            console.log(vm.score);
            vm.submitLesson = function(){
                vm.score = 0;
                for(i=0; i<vm.lesson.questions.length; i++){
                    if(vm.lesson.questions[i].score){
                        vm.score++;
                    }
                }
                vm.score *= 100;
                vm.score=vm.score/vm.lesson.questions.length;

                console.log(vm.score);
            };




        }
}());

//bcp de dépendances inutilisées mais qui pourront toutefois servir !
