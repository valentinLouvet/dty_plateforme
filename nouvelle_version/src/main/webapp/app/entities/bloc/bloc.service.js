(function() {
    'use strict';
    angular
        .module('objectifDtyApp')
        .factory('Bloc', Bloc)
        .factory('BlocsWid',BlocsWid);

    Bloc.$inject = ['$resource'];
    BlocsWid.$inject=['$resource'];

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

    function BlocsWid($resource) {
        return $resource('api/blocswid',{},{
            'get':{
                method:'GET', isArray:true
            }
        });

    }


})();

//remarque : si on veut agir sur un bloc en particulier, ne pas hésiter à créer une requete api/bloswid/:id. A créer dans le back aussi.
