(function () {
    'use strict';

    angular
        .module('objectifDtyApp')
        .controller('courseEditionController',['$state', '$cookies','Bloc', 'Lesson', 'AlertService', 'BlocsWid',function ($state, $cookies,Bloc,Lesson,AlertService,BlocsWid) {
            var vm=this;
            vm.compteur=1;
            vm.blocs=[];
            //vm.blocs_test= tests;

            //blocswid : load all the blocs mais pas le contenu des lessons. en espérant que ca suffit.


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

            /*

            vm.reset = function(){
                console.log("GLOUBIBOULGA");
                vm.blocs =[];
                loadAll();

            }
            // Useless now

            */


            this.addCompteur= function(i){
                this.compteur = this.compteur + i
            };

            this.setCompteur = function (i) {
                this.compteur = i
            };

            this.editBloc=function (id) {
                $state.go('createBloc',{id:id,edit:'edit'})
            }




        }] );







})();

