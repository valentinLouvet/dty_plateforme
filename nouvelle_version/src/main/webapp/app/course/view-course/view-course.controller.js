(function(){

    angular.module('objectifDtyApp').controller('CourseViewController',ViewCourseController);

    ViewCourseController.$inject = ['courseView','$scope', '$rootScope', '$stateParams', 'DataUtils', 'Lesson', 'Coach', 'Bloc', 'Question'];

        function ViewCourseController(courseView,$scope,$rootScope,$stateParams,DataUtils,Lesson,Coach,Bloc,Question){

            this.id=$stateParams.id;
            this.lesson=courseView;
            console.log(this.lesson);

        }
}());

//bcp de dépendances inutilisées mais qui pourront toutefois servir !
