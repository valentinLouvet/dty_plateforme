(function() {
    'use strict';

    angular
        .module('objectifDtyApp')
        .config(stateConfig);

    stateConfig.$inject = ['$stateProvider'];

    function stateConfig($stateProvider) {
        $stateProvider
        .state('student', {
            parent: 'entity',
            url: '/student',
            data: {
                authorities: ['ROLE_ADMIN'],
                pageTitle: 'Students'
            },
            views: {
                'content@': {
                    templateUrl: 'app/entities/student/students.html',
                    controller: 'StudentController',
                    controllerAs: 'vm'
                }
            },
            resolve: {
            }
        })
        .state('student-detail', {
            parent: 'entity',
            url: '/student/{id}',
            data: {
                authorities: ['ROLE_ADMIN'],
                pageTitle: 'Student'
            },
            views: {
                'content@': {
                    templateUrl: 'app/entities/student/student-detail.html',
                    controller: 'StudentDetailController',
                    controllerAs: 'vm'
                }
            },
            resolve: {
                entity: ['$stateParams', 'Student', function($stateParams, Student) {
                    return Student.get({id : $stateParams.id}).$promise;
                }]
            }
        })
        .state('student.new', {
            parent: 'student',
            url: '/new',
            data: {
                authorities: ['ROLE_ADMIN']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/student/student-dialog.html',
                    controller: 'StudentDialogController',
                    controllerAs: 'vm',
                    backdrop: 'static',
                    size: 'lg',
                    resolve: {
                        entity: function () {
                            return {
                                nb_lesson_today: null,
                                id: null
                            };
                        }
                    }
                }).result.then(function() {
                    $state.go('student', null, { reload: true });
                }, function() {
                    $state.go('student');
                });
            }]
        })
        .state('student.edit', {
            parent: 'student',
            url: '/{id}/edit',
            data: {
                authorities: ['ROLE_ADMIN']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/student/student-dialog.html',
                    controller: 'StudentDialogController',
                    controllerAs: 'vm',
                    backdrop: 'static',
                    size: 'lg',
                    resolve: {
                        entity: ['Student', function(Student) {
                            return Student.get({id : $stateParams.id}).$promise;
                        }]
                    }
                }).result.then(function() {
                    $state.go('student', null, { reload: true });
                }, function() {
                    $state.go('^');
                });
            }]
        })
        .state('student.delete', {
            parent: 'student',
            url: '/{id}/delete',
            data: {
                authorities: ['ROLE_ADMIN']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/student/student-delete-dialog.html',
                    controller: 'StudentDeleteController',
                    controllerAs: 'vm',
                    size: 'md',
                    resolve: {
                        entity: ['Student', function(Student) {
                            return Student.get({id : $stateParams.id}).$promise;
                        }]
                    }
                }).result.then(function() {
                    $state.go('student', null, { reload: true });
                }, function() {
                    $state.go('^');
                });
            }]
        });
    }

})();
