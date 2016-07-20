(function() {
    'use strict';

    angular
        .module('objectifDtyApp')
        .config(stateConfig);

    stateConfig.$inject = ['$stateProvider'];

    function stateConfig($stateProvider) {
        $stateProvider.state('createCourse', {
            parent: 'course',
            url: '/course/edit',
            data: {
                authorities: ['ROLE_COACH', 'ROLE_ADMIN'],
                pageTitle: 'Course creation'
            },
            views: {
                'content@': {
                    templateUrl: 'app/course/create-course/create-course.html',
                    controller: 'courseCreationController',
                    controllerAs: 'vm'
                }
            }
        });
    }
})();
