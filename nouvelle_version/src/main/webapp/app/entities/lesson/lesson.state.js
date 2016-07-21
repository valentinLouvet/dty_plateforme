(function() {
    'use strict';

    angular
        .module('objectifDtyApp')
        .config(stateConfig);

    stateConfig.$inject = ['$stateProvider'];

    function stateConfig($stateProvider) {
        $stateProvider
        .state('lesson', {
            parent: 'entity',
            url: '/lesson',
            data: {
                authorities: ['ROLE_ADMIN'],
                pageTitle: 'Lessons'
            },
            views: {
                'content@': {
                    templateUrl: 'app/entities/lesson/lessons.html',
                    controller: 'LessonController',
                    controllerAs: 'vm'
                }
            },
            resolve: {
            }
        })
        .state('lesson-detail', {
            parent: 'entity',
            url: '/lesson/{id}',
            data: {
                authorities: ['ROLE_ADMIN'],
                pageTitle: 'Lesson'
            },
            views: {
                'content@': {
                    templateUrl: 'app/entities/lesson/lesson-detail.html',
                    controller: 'LessonDetailController',
                    controllerAs: 'vm'
                }
            },
            resolve: {
                entity: ['$stateParams', 'Lesson', function($stateParams, Lesson) {
                    return Lesson.get({id : $stateParams.id}).$promise;
                }]
            }
        })
        .state('lesson.new', {
            parent: 'lesson',
            url: '/new',
            data: {
                authorities: ['ROLE_ADMIN']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/lesson/lesson-dialog.html',
                    controller: 'LessonDialogController',
                    controllerAs: 'vm',
                    backdrop: 'static',
                    size: 'lg',
                    resolve: {
                        entity: function () {
                            return {
                                cours: null,
                                level: null,
                                num_lesson: null,
                                title: null,
                                id: null
                            };
                        }
                    }
                }).result.then(function() {
                    $state.go('lesson', null, { reload: true });
                }, function() {
                    $state.go('lesson');
                });
            }]
        })
        .state('lesson.edit', {
            parent: 'lesson',
            url: '/{id}/edit',
            data: {
                authorities: ['ROLE_ADMIN']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/lesson/lesson-dialog.html',
                    controller: 'LessonDialogController',
                    controllerAs: 'vm',
                    backdrop: 'static',
                    size: 'lg',
                    resolve: {
                        entity: ['Lesson', function(Lesson) {
                            return Lesson.get({id : $stateParams.id}).$promise;
                        }]
                    }
                }).result.then(function() {
                    $state.go('lesson', null, { reload: true });
                }, function() {
                    $state.go('^');
                });
            }]
        })
        .state('lesson.delete', {
            parent: 'lesson',
            url: '/{id}/delete',
            data: {
                authorities: ['ROLE_ADMIN']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/lesson/lesson-delete-dialog.html',
                    controller: 'LessonDeleteController',
                    controllerAs: 'vm',
                    size: 'md',
                    resolve: {
                        entity: ['Lesson', function(Lesson) {
                            return Lesson.get({id : $stateParams.id}).$promise;
                        }]
                    }
                }).result.then(function() {
                    $state.go('lesson', null, { reload: true });
                }, function() {
                    $state.go('^');
                });
            }]
        });
    }

})();
