(function() {
    'use strict';

    angular
        .module('objectifDtyApp')
        .config(stateConfig);

    stateConfig.$inject = ['$stateProvider'];

    function stateConfig($stateProvider) {
        $stateProvider
        .state('badge', {
            parent: 'entity',
            url: '/badge',
            data: {
                authorities: ['ROLE_USER', 'ROLE_ADMIN'],
                pageTitle: 'Badges'
            },
            views: {
                'content@': {
                    templateUrl: 'app/entities/badge/badges.html',
                    controller: 'BadgeController',
                    controllerAs: 'vm'
                }
            },
            resolve: {
            }
        })
        .state('badge-detail', {
            parent: 'entity',
            url: '/badge/{id}',
            data: {
                authorities: ['ROLE_USER', 'ROLE_ADMIN'],
                pageTitle: 'Badge'
            },
            views: {
                'content@': {
                    templateUrl: 'app/entities/badge/badge-detail.html',
                    controller: 'BadgeDetailController',
                    controllerAs: 'vm'
                }
            },
            resolve: {
                entity: ['$stateParams', 'Badge', function($stateParams, Badge) {
                    return Badge.get({id : $stateParams.id}).$promise;
                }]
            }
        })
        .state('badge.new', {
            parent: 'badge',
            url: '/new',
            data: {
                authorities: ['ROLE_USER', 'ROLE_ADMIN']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/badge/badge-dialog.html',
                    controller: 'BadgeDialogController',
                    controllerAs: 'vm',
                    backdrop: 'static',
                    size: 'lg',
                    resolve: {
                        entity: function () {
                            return {
                                name: null,
                                logo: null,
                                id: null
                            };
                        }
                    }
                }).result.then(function() {
                    $state.go('badge', null, { reload: true });
                }, function() {
                    $state.go('badge');
                });
            }]
        })
        .state('badge.edit', {
            parent: 'badge',
            url: '/{id}/edit',
            data: {
                authorities: ['ROLE_USER', 'ROLE_ADMIN']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/badge/badge-dialog.html',
                    controller: 'BadgeDialogController',
                    controllerAs: 'vm',
                    backdrop: 'static',
                    size: 'lg',
                    resolve: {
                        entity: ['Badge', function(Badge) {
                            return Badge.get({id : $stateParams.id}).$promise;
                        }]
                    }
                }).result.then(function() {
                    $state.go('badge', null, { reload: true });
                }, function() {
                    $state.go('^');
                });
            }]
        })
        .state('badge.delete', {
            parent: 'badge',
            url: '/{id}/delete',
            data: {
                authorities: ['ROLE_USER', 'ROLE_ADMIN']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/badge/badge-delete-dialog.html',
                    controller: 'BadgeDeleteController',
                    controllerAs: 'vm',
                    size: 'md',
                    resolve: {
                        entity: ['Badge', function(Badge) {
                            return Badge.get({id : $stateParams.id}).$promise;
                        }]
                    }
                }).result.then(function() {
                    $state.go('badge', null, { reload: true });
                }, function() {
                    $state.go('^');
                });
            }]
        });
    }

})();
