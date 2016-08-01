(function() {
    'use strict';
    angular
        .module('objectifDtyApp')
        .factory('Lesson_done', Lesson_done);

    Lesson_done.$inject = ['$resource'];

    function Lesson_done ($resource) {
        var resourceUrl = 'api/lesson-dones/:id';

        var res1= $resource(resourceUrl, {}, {
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

        var res2=$resource("api/lesson-doneswid",{},{
            'get':{
                method:'GET',isArray:true
            }
        });

        return{
            'query':res1.query,'get':res1.get,'update':res1.update,'lessonDoneWid':res2.get
        }
    }
})();
