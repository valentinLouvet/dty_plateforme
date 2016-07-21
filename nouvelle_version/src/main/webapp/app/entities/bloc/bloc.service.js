(function() {
    'use strict';
    angular
        .module('objectifDtyApp')
        .factory('Bloc', Bloc);

    Bloc.$inject = ['$resource'];

    function Bloc ($resource) {
        var resourceUrl =  'api/blocs/:id';

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
