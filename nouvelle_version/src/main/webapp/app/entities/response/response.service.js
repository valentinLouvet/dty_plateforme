(function() {
    'use strict';
    angular
        .module('objectifDtyApp')
        .factory('Response', Response);

    Response.$inject = ['$resource'];

    function Response ($resource) {
        var resourceUrl =  'api/responses/:id';

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
