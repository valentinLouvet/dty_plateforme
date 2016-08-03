(function () {
    'use strict';

    angular
        .module('objectifDtyApp')
        .controller('courseListController', ['BlocsWid', 'AlertService', function (BlocsWid, AlertService) {
            var vm = this;

            vm.blocs=[];
            vm.compteur=1;

            function loadAll () {
                // {page: vm.page, size: 10000} nécessaire pour charger tous les blocs
                // 10000 est une marge haute (on est sûr qu'il y aura moins de 10000 blocs à charger)
                BlocsWid.get({page: vm.page, size: 10000},onSuccess,onError)
            }

            function onSuccess(data){
                vm.blocs=data;
                console.log(data)
            }

            function onError(error){
                AlertService.error(error.data.message)
            }

            loadAll();

            vm.setCompteur = function(i){
                vm.compteur = i;
            };

            vm.addCompteur = function (i){
                vm.compteur = vm.compteur + i;
            }
        }])
})();
