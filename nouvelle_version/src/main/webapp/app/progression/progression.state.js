(function() {
    'use strict';

    angular
        .module('objectifDtyApp')
        .config(stateConfig);

    stateConfig.$inject = ['$stateProvider'];

    function stateConfig($stateProvider) {
        $stateProvider.state('progression', {
            parent: 'app',
            url: '/progression',
            data: {
                authorities: ['ROLE_USER', 'ROLE_COACH', 'ROLE_ADMIN']
            },
            views: {
                'content@': {
                    templateUrl: 'app/progression/progression.html',
                    controller: 'progressionController',
                    controllerAs: 'vm'
                }
            }
        });
    }
})();
