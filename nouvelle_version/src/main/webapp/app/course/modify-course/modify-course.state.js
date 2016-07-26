(function(){

    angular.module('objectifDtyApp').config(stateConfig);
    stateConfig.$inject = ['$stateProvider'];

    function stateConfig($stateProvider) {
        $stateProvider.state('modifyCourse', {

            parent: 'course',
            url:'/modify/:id',
            data: {
                    authorities: ['ROLE_COACH', 'ROLE_ADMIN'],
                    pageTitle: 'Modify Course'
            },
            views: {
                'content@': {
                    templateUrl: 'app/course/modify-course/modify-course.html',
                    controller: 'courseModifyController',
                    controllerAs: 'vm'
                }
            },

            resolve: {
                courseView: ['$stateParams', 'Lesson', function($stateParams, Lesson) {
                    console.log(Lesson.get({id : $stateParams.id}).$promise);
                    return Lesson.get({id : $stateParams.id}).$promise;
                }]
            }

            })

    }


}());
