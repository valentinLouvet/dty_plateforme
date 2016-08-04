(function () {
    'use strict';

    angular
        .module('objectifDtyApp')
        .config(stateConfig);

    stateConfig.$inject = ['$stateProvider'];

    function stateConfig($stateProvider) {
        $stateProvider
            .state('error', {
                parent: 'app',
                url: '/error',
                data: {
                    authorities: [],
                    pageTitle: 'Error page!'
                },
                views: {
                    'content@': {
                        templateUrl: 'app/layouts/error/error.html'
                    }
                }
            })
            .state('accessdenied', {
                parent: 'app',
                url: '/accessdenied',
                data: {
                    authorities: []
                },
                views: {
                    'content@': {
                        templateUrl: 'app/layouts/error/accessdenied.html'
                    }
                }
            })
            .state('tooMuchLesson', {
                parent: 'app',
                url: '/tooMuchLesson',
                data: {
                    authorities: [],
                    pageTitle: 'too Much Lesson done!'
                },
                views: {
                    'content@': {
                        templateUrl: 'app/layouts/error/tooMuchLessonDone.html'
                    }
                }
            });
    }
})();
