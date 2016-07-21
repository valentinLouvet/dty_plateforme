(function() {
    'use strict';
    angular
        .module('objectifDtyApp')
        .factory('Lesson', Lesson);

    Lesson.$inject = ['$resource'];

    function Lesson ($resource) {
        var resourceUrl =  'api/lessons/:id';

        return $resource(resourceUrl, {}, {
            'query': { method: 'GET', isArray: true},
            'get': {
                method: 'GET',
                transformResponse: function (data) {
                    if (data) {
                        data = angular.fromJson(data);
                    }
                    return data;
                }
            },
            'update': { method:'PUT' }
        });
    }
})();
