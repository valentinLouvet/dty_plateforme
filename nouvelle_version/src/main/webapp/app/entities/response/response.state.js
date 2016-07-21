(function() {
    'use strict';

    angular
        .module('objectifDtyApp')
        .config(stateConfig);

    stateConfig.$inject = ['$stateProvider'];

    function stateConfig($stateProvider) {
        $stateProvider
        .state('response', {
            parent: 'entity',
            url: '/response',
            data: {
                authorities: ['ROLE_ADMIN'],
                pageTitle: 'Responses'
            },
            views: {
                'content@': {
                    templateUrl: 'app/entities/response/responses.html',
                    controller: 'ResponseController',
                    controllerAs: 'vm'
                }
            },
            resolve: {
            }
        })
        .state('response-detail', {
            parent: 'entity',
            url: '/response/{id}',
            data: {
                authorities: ['ROLE_ADMIN'],
                pageTitle: 'Response'
            },
            views: {
                'content@': {
                    templateUrl: 'app/entities/response/response-detail.html',
                    controller: 'ResponseDetailController',
                    controllerAs: 'vm'
                }
            },
            resolve: {
                entity: ['$stateParams', 'Response', function($stateParams, Response) {
                    return Response.get({id : $stateParams.id}).$promise;
                }]
            }
        })
        .state('response.new', {
            parent: 'response',
            url: '/new',
            data: {
                authorities: ['ROLE_ADMIN']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/response/response-dialog.html',
                    controller: 'ResponseDialogController',
                    controllerAs: 'vm',
                    backdrop: 'static',
                    size: 'lg',
                    resolve: {
                        entity: function () {
                            return {
                                text: null,
                                veracity: null,
                                id: null
                            };
                        }
                    }
                }).result.then(function() {
                    $state.go('response', null, { reload: true });
                }, function() {
                    $state.go('response');
                });
            }]
        })
        .state('response.edit', {
            parent: 'response',
            url: '/{id}/edit',
            data: {
                authorities: ['ROLE_ADMIN']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/response/response-dialog.html',
                    controller: 'ResponseDialogController',
                    controllerAs: 'vm',
                    backdrop: 'static',
                    size: 'lg',
                    resolve: {
                        entity: ['Response', function(Response) {
                            return Response.get({id : $stateParams.id}).$promise;
                        }]
                    }
                }).result.then(function() {
                    $state.go('response', null, { reload: true });
                }, function() {
                    $state.go('^');
                });
            }]
        })
        .state('response.delete', {
            parent: 'response',
            url: '/{id}/delete',
            data: {
                authorities: ['ROLE_ADMIN']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/response/response-delete-dialog.html',
                    controller: 'ResponseDeleteController',
                    controllerAs: 'vm',
                    size: 'md',
                    resolve: {
                        entity: ['Response', function(Response) {
                            return Response.get({id : $stateParams.id}).$promise;
                        }]
                    }
                }).result.then(function() {
                    $state.go('response', null, { reload: true });
                }, function() {
                    $state.go('^');
                });
            }]
        });
    }

})();
