(function () {

    angular.module('objectifDtyApp').config(stateConfig);
    stateConfig.$inject = ['$stateProvider'];

    function stateConfig($stateProvider) {
        $stateProvider
            .state('viewCourse', {

                parent: 'course',
                url: '/view/:id',
                data: {
                    authorities: ['ROLE_USER', 'ROLE_COACH', 'ROLE_ADMIN'],
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
                    courseView: ['$stateParams', 'Lesson', function ($stateParams, Lesson) {
                        return Lesson.get({id: $stateParams.id}).$promise;
                    }]
                }
            })
            .state('course.BadgeCourse', {
                parent: 'course',
                url: '/{id}/{idLesson}/SucessBadge',
                data: {
                    authorities: ['ROLE_ADMIN', 'ROLE_USER', 'ROLE_COACH']
                },
                onEnter: ['$stateParams', '$state', '$uibModal', function ($stateParams, $state, $uibModal) {
                    $uibModal.open({
                        templateUrl: 'app/badge/1-badge.html',
                        controller: 'BadgeController',
                        controllerAs: 'vm',
                        size: 'md'
                    });
                }]
            })
            .state('choosecourse', {
                parent: 'viewCourse',
                url: '/choosecourse',
                data: {
                    authorities: ['ROLE_ADMIN', 'ROLE_USER']
                },
                onEnter: ['$stateParams', '$state', '$uibModal', function ($stateParams, $state, $uibModal) {
                    $uibModal.open({
                        templateUrl: 'app/course/view-course/choosecourse.html',
                        controller: 'ChooseCourseController',
                        controllerAs: 'vm',
                        backdrop: 'static',
                        size: 'lg',
                        resolve: {
                            courseView: ['$stateParams', 'Bloc', function ($stateParams, Bloc) {
                                return Bloc.query().$promise;
                            }]
                        }
                    }).result.then(function () {
                        $state.go('viewCourse', null, {reload: true});
                    }, function () {
                        $state.go('^');
                    });
                }]
            });

    }


}());

