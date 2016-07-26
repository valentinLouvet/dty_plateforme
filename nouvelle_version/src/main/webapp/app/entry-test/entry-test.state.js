(function() {
    'use strict';

    angular
        .module('objectifDtyApp')
        .config(stateConfig);

    stateConfig.$inject = ['$stateProvider'];

    function stateConfig($stateProvider) {
        $stateProvider.state('entry-test', {
            parent: 'app',
            url: '/test',
            data: {
                authorities: []
            },
            views: {
                'content@': {
                    templateUrl: 'app/entry-test/entry-test.html',
                    controller: 'entryTestController',
                    controllerAs: 'vm'
                }
            }
        });
    }
})();
