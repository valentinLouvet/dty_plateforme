(function(){

    angular.module('objectifDtyApp')
        .controller('CourseViewController',['$scope', '$rootScope', '$stateParams', 'DataUtils','Lesson', 'Coach', 'Bloc', 'Question',function($scope,$rootScope,$stateParams,DataUtils,Lesson,Coach,Bloc,Question){
            this.id=$stateParams.id;

        }])
}());

//bcp de dépendances inutilisées mais qui pourront toutefois servir !
