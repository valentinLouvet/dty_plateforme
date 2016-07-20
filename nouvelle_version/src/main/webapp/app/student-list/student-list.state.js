(function() {
    'use strict';

    angular
        .module('objectifDtyApp')
        .config(stateConfig);

    stateConfig.$inject = ['$stateProvider'];

    function stateConfig($stateProvider) {
        $stateProvider.state('student-list', {
            parent: 'app',
            url: '/student-list',
            data: {
                authorities: []
            },
            views: {
                'content@': {
                    templateUrl: 'app/student-list/student-list.html',
                    controller: 'studentListController',
                    controllerAs: 'vm'
                }
            }
        });
    }
})();
