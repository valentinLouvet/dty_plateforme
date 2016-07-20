// Lesson.state : pour tous les états relatifs à la leçon à savoir : view, edit, create. ( edit et create ? )
(function(){

    angular.module('objectifDtyApp').config(stateConfig);
    stateConfig.$inject = ['$stateProvider'];

    function stateConfig($stateProvider) {
        $stateProvider.state('viewCourse', {

            parent: 'course',
            url: '/course/view',
            data: {
                authorities:['ROLE_USER','ROLE_COACH','ROLE_ADMIN'],
                pageTitle: 'Course'
            },
            views: {
                'content@': {
                    templateUrl: 'app/course/view-course/view-course.html',
                    controller: 'LessonViewController',
                    controllerAs: 'vm'
                }
            }
        })

    }


}());

