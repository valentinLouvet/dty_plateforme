(function(){

    angular.module('objectifDtyApp').controller('CourseViewController',ViewCourseController);

    ViewCourseController.$inject = ['Principal','courseView','$scope', '$rootScope', '$stateParams', 'DataUtils', 'Lesson', 'Coach', 'Bloc', 'Question'];

        function ViewCourseController(Principal,courseView,$scope,$rootScope,$stateParams,DataUtils,Lesson,Coach,Bloc,Question){

            this.id=$stateParams.id;
            this.lesson=courseView;
            console.log(this.lesson);
            console.log(Principal.identity())

        }
}());

//bcp de dépendances inutilisées mais qui pourront toutefois servir !
