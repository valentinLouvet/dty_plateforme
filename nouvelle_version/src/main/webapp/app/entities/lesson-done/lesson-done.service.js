(function() {
    'use strict';
    angular
        .module('objectifDtyApp')
        .factory('Lesson_done', Lesson_done)
        .factory('Lesson_doneWid',Lesson_doneWid);


    Lesson_done.$inject = ['$resource'];

    function Lesson_done ($resource) {
        var resourceUrl = 'api/lesson-dones/:id';

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
    };

    Lesson_doneWid.inject=['$resource'];

    function Lesson_doneWid($resource){
        return $resource("api/lesson-doneswid",{},{
            'get':{
                method:'GET',isArray:true
            }
        });
    }
})();
