// Lesson.state : pour tous les états relatifs à la leçon à savoir : view, edit, create. ( edit et create ? )
(function(){

    angular.module('objectifDtyApp').config(stateConfig);
    stateConfig.$inject = ['$stateProvider'];

    function stateConfig($stateProvider) {
        $stateProvider
            .state('listCourse', {

                parent: 'course',
                url: '/list',
                data: {
                    authorities:['ROLE_COACH','ROLE_ADMIN'],
                    pageTitle: 'List Course'
                },
                views: {
                    'content@': {
                        templateUrl: 'app/course/list-course/list-course.html',
                        controller: 'courseListController',
                        controllerAs: 'vm'
                    }
                }

            })
    }

})();

