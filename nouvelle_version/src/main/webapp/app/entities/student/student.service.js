(function() {
    'use strict';
    angular
        .module('objectifDtyApp')
        .factory('Student', Student);

    Student.$inject = ['$resource'];

    function Student ($resource) {
        var resourceUrl =  'api/students/:id';

        var res1= $resource(resourceUrl, {}, {
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

        var res2=$resource('api/allstudents',{},{
            'getAll':{
                method:'GET',isArray:true
            }
        });

        return { 'query':res1.query,'get':res1.get,'update':res1.update,'getAll':res2.getAll}
    }
})();
