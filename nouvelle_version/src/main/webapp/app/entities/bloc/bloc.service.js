(function() {
    'use strict';
    angular
        .module('objectifDtyApp')
        .factory('Bloc', Bloc);

    Bloc.$inject = ['$resource'];

    function Bloc ($resource) {
        var resourceUrl =  'api/blocs/:id';

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

        var res2=$resource('api/blocswid',{},{
            'get':{
                method:'GET', isArray:true
                }
        });

        return{
            'query':res1.query,'get':res1.get,'update':res1.update,'blocswid':res2.get
        }
    }
})();

//remarque : si on veut agir sur un bloc en particulier, ne pas hésiter à créer une requete api/bloswid/:id. A créer dans le back aussi.
