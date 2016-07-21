// Lesson.state : pour tous les états relatifs à la leçon à savoir : view, edit, create. ( edit et create ? )
(function(){

    angular.module('objectifDtyApp').config(stateConfig);
    stateConfig.$inject = ['$stateProvider'];

    function stateConfig($stateProvider) {
        $stateProvider.state('editCourse', {

            parent: 'course',
            url: '/edit',
            data: {
                authorities:['ROLE_COACH','ROLE_ADMIN'],
                pageTitle: 'Edit Course'
            },
            views: {
                'content@': {
                    templateUrl: 'app/course/edit-course/edit-course.html',
                    controller: 'courseEditionController',
                    controllerAs: 'vm'
                }
            }
        })
    }


}());

