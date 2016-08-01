(function() {
    'use strict';
    angular
        .module('objectifDtyApp')
        .factory('Student', Student)
        .factory('AllStudent',getAllStudent);

    Student.$inject = ['$resource'];
    getAllStudent.$inject= ['$resource'];

    function Student ($resource) {
        var resourceUrl = 'api/students/:id';

        return $resource(resourceUrl, {}, {
            'query': {method: 'GET', isArray: true},
            'get': {
                method: 'GET',
                transformResponse: function (data) {
                    if (data) {
                        data = angular.fromJson(data);
                    }
                    return data;
                }
            },
            'update': {method: 'PUT'}
        });
    }

    function getAllStudent($resource) {
        return $resource('api/allstudents', {}, {
            'query': {
                method: 'GET', isArray: true
            }
        })
    }

})();
