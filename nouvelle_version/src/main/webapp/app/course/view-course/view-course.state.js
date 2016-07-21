(function(){

    angular.module('objectifDtyApp').config(stateConfig);
    stateConfig.$inject = ['$stateProvider'];

    function stateConfig($stateProvider) {
        $stateProvider.state('viewCourse', {

            parent: 'course',
            url: '/view',
            params:{id: null},
            data: {
                authorities:['ROLE_USER','ROLE_COACH','ROLE_ADMIN'],
                pageTitle: 'Course'
            },
            views: {
                'content@': {
                    templateUrl: 'app/course/view-course/view-course.html',
                    controller: 'CourseViewController',
                    controllerAs: 'vm'
                }


            },
            resolve: {
                courseView: ['$stateParams', 'Lesson', function($stateParams, Lesson) {
                    return Lesson.get({id : $stateParams.id}).$promise;
                }]
            }
        })

    }


}());

