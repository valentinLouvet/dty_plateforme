(function () {
    'use strict';

    angular.module('objectifDtyApp')
        .controller('entryTestController',['Bloc', 'AlertService', function (Bloc, AlertService) {
            var vm = this;
            vm.blocs = [];

            function loadAll () {
                Bloc.query({},onSuccess,onError)
            }

            function onSuccess(data){
                vm.blocs=data;
                console.log(data);
            }

            function onError(error){
                AlertService.error(error.data.message);
            }


            loadAll();

        }])
})();
