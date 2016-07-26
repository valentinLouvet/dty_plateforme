(function() {
    'use strict';
    angular
        .module('objectifDtyApp')
        .factory('Student', Student);

    Student.$inject = ['$resource'];

    function Student ($resource) {
        var resourceUrl =  'api/students/:id';

        return $resource(resourceUrl, {}, {
            'query': { method: 'GET', isArray: true, transformResponse:function (data) {
                if(data){
                    data=angular.fromJson(data);
                }
                return data
            }
            },
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
