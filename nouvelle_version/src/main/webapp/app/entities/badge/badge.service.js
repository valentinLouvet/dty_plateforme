(function() {
    'use strict';
    angular
        .module('objectifDtyApp')
        .factory('Badge', Badge);

    Badge.$inject = ['$resource'];

    function Badge ($resource) {
        var resourceUrl =  'api/badges/:id';

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
