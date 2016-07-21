(function() {
    'use strict';

    angular
        .module('objectifDtyApp')
        .config(stateConfig);

    stateConfig.$inject = ['$stateProvider'];

    function stateConfig($stateProvider) {
        $stateProvider
        .state('bloc', {
            parent: 'entity',
            url: '/bloc',
            data: {
                authorities: ['ROLE_ADMIN'],
                pageTitle: 'Blocs'
            },
            views: {
                'content@': {
                    templateUrl: 'app/entities/bloc/blocs.html',
                    controller: 'BlocController',
                    controllerAs: 'vm'
                }
            },
            resolve: {
            }
        })
        .state('bloc-detail', {
            parent: 'entity',
            url: '/bloc/{id}',
            data: {
                authorities: ['ROLE_ADMIN'],
                pageTitle: 'Bloc'
            },
            views: {
                'content@': {
                    templateUrl: 'app/entities/bloc/bloc-detail.html',
                    controller: 'BlocDetailController',
                    controllerAs: 'vm'
                }
            },
            resolve: {
                entity: ['$stateParams', 'Bloc', function($stateParams, Bloc) {
                    return Bloc.get({id : $stateParams.id}).$promise;
                }]
            }
        })
        .state('bloc.new', {
            parent: 'bloc',
            url: '/new',
            data: {
                authorities: ['ROLE_ADMIN']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/bloc/bloc-dialog.html',
                    controller: 'BlocDialogController',
                    controllerAs: 'vm',
                    backdrop: 'static',
                    size: 'lg',
                    resolve: {
                        entity: function () {
                            return {
                                name: null,
                                logo: null,
                                description: null,
                                id: null
                            };
                        }
                    }
                }).result.then(function() {
                    $state.go('bloc', null, { reload: true });
                }, function() {
                    $state.go('bloc');
                });
            }]
        })
        .state('bloc.edit', {
            parent: 'bloc',
            url: '/{id}/edit',
            data: {
                authorities: ['ROLE_ADMIN']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/bloc/bloc-dialog.html',
                    controller: 'BlocDialogController',
                    controllerAs: 'vm',
                    backdrop: 'static',
                    size: 'lg',
                    resolve: {
                        entity: ['Bloc', function(Bloc) {
                            return Bloc.get({id : $stateParams.id}).$promise;
                        }]
                    }
                }).result.then(function() {
                    $state.go('bloc', null, { reload: true });
                }, function() {
                    $state.go('^');
                });
            }]
        })
        .state('bloc.delete', {
            parent: 'bloc',
            url: '/{id}/delete',
            data: {
                authorities: ['ROLE_ADMIN']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/bloc/bloc-delete-dialog.html',
                    controller: 'BlocDeleteController',
                    controllerAs: 'vm',
                    size: 'md',
                    resolve: {
                        entity: ['Bloc', function(Bloc) {
                            return Bloc.get({id : $stateParams.id}).$promise;
                        }]
                    }
                }).result.then(function() {
                    $state.go('bloc', null, { reload: true });
                }, function() {
                    $state.go('^');
                });
            }]
        });
    }

})();
