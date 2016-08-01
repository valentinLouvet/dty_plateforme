(function () {
    'use strict';

    angular
        .module('objectifDtyApp')
        .controller('courseEditionController',['$state', '$cookies','Bloc', 'Lesson', 'AlertService',function ($state, $cookies,Bloc,Lesson,AlertService) {
            var vm=this;
            vm.compteur=1;
            vm.blocs=[];
            //vm.blocs_test= tests;

            //blocswid : load all the blocs mais pas le contenu des lessons. en espérant que ca suffit.


            function loadAll () {
                Bloc.blocswid({},onSuccess,onError)
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



        }] );







})();

