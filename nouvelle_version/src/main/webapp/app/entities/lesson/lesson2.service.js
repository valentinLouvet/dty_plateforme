(function() {
    'use strict';
    angular
        .module('objectifDtyApp')
        .factory('Lesson2', Lesson2);

    Lesson2.$inject = ['$resource'];

    function Lesson2 ($resource) {
        var resourceUrl =  'api/lessonWithBlocId/:id';

        return $resource(resourceUrl, {}, {
            //'query': { method: 'GET', isArray: true},
            'get': {
                method: 'GET',
                transformResponse: function (data) {
                    if (data) {
                        data = angular.fromJson(data);
                    }
                    return data;
                }
            }
            //'update': { method:'PUT' }
        });
    }
})();
