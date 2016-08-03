(function() {
    'use strict';

    angular
        .module('objectifDtyApp')
        .config(stateConfig);

    stateConfig.$inject = ['$stateProvider'];

    function stateConfig($stateProvider) {
        $stateProvider.state('createBloc', {
            parent: 'course',
            url: '/blocCreation/:id/:edit',
            data: {
                authorities: ['ROLE_COACH', 'ROLE_ADMIN'],
                pageTitle: 'Bloc creation'
            },
            views: {
                'content@': {
                    templateUrl: 'app/course/create-bloc/create-bloc.html',
                    controller: 'blocCreationController',
                    controllerAs: 'vm'
                }
            }

        });
    }
})();
