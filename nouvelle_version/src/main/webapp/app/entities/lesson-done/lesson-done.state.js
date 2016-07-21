(function() {
    'use strict';

    angular
        .module('objectifDtyApp')
        .config(stateConfig);

    stateConfig.$inject = ['$stateProvider'];

    function stateConfig($stateProvider) {
        $stateProvider
        .state('lesson-done', {
            parent: 'entity',
            url: '/lesson-done',
            data: {
                authorities: ['ROLE_ADMIN'],
                pageTitle: 'Lesson_dones'
            },
            views: {
                'content@': {
                    templateUrl: 'app/entities/lesson-done/lesson-dones.html',
                    controller: 'Lesson_doneController',
                    controllerAs: 'vm'
                }
            },
            resolve: {
            }
        })
        .state('lesson-done-detail', {
            parent: 'entity',
            url: '/lesson-done/{id}',
            data: {
                authorities: ['ROLE_ADMIN'],
                pageTitle: 'Lesson_done'
            },
            views: {
                'content@': {
                    templateUrl: 'app/entities/lesson-done/lesson-done-detail.html',
                    controller: 'Lesson_doneDetailController',
                    controllerAs: 'vm'
                }
            },
            resolve: {
                entity: ['$stateParams', 'Lesson_done', function($stateParams, Lesson_done) {
                    return Lesson_done.get({id : $stateParams.id}).$promise;
                }]
            }
        })
        .state('lesson-done.new', {
            parent: 'lesson-done',
            url: '/new',
            data: {
                authorities: ['ROLE_ADMIN']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/lesson-done/lesson-done-dialog.html',
                    controller: 'Lesson_doneDialogController',
                    controllerAs: 'vm',
                    backdrop: 'static',
                    size: 'lg',
                    resolve: {
                        entity: function () {
                            return {
                                note_init: null,
                                note_max: null,
                                id: null
                            };
                        }
                    }
                }).result.then(function() {
                    $state.go('lesson-done', null, { reload: true });
                }, function() {
                    $state.go('lesson-done');
                });
            }]
        })
        .state('lesson-done.edit', {
            parent: 'lesson-done',
            url: '/{id}/edit',
            data: {
                authorities: ['ROLE_ADMIN']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/lesson-done/lesson-done-dialog.html',
                    controller: 'Lesson_doneDialogController',
                    controllerAs: 'vm',
                    backdrop: 'static',
                    size: 'lg',
                    resolve: {
                        entity: ['Lesson_done', function(Lesson_done) {
                            return Lesson_done.get({id : $stateParams.id}).$promise;
                        }]
                    }
                }).result.then(function() {
                    $state.go('lesson-done', null, { reload: true });
                }, function() {
                    $state.go('^');
                });
            }]
        })
        .state('lesson-done.delete', {
            parent: 'lesson-done',
            url: '/{id}/delete',
            data: {
                authorities: ['ROLE_ADMIN']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/lesson-done/lesson-done-delete-dialog.html',
                    controller: 'Lesson_doneDeleteController',
                    controllerAs: 'vm',
                    size: 'md',
                    resolve: {
                        entity: ['Lesson_done', function(Lesson_done) {
                            return Lesson_done.get({id : $stateParams.id}).$promise;
                        }]
                    }
                }).result.then(function() {
                    $state.go('lesson-done', null, { reload: true });
                }, function() {
                    $state.go('^');
                });
            }]
        });
    }

})();
