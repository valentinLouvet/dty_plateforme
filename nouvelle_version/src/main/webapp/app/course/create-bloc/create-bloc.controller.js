(function () {
    'use strict';

    angular
        .module('objectifDtyApp')
        .controller('blocCreationController',['$state','$stateParams','Bloc', function ($state,$stateParams,Bloc) {
            var vm = this;
            var edit=$stateParams.edit!==null;
            vm.edit=edit;
            console.log(edit)

            vm.blocs = [];
            if(edit) {
                var id=$stateParams.id;
                Bloc.get({id:id}).$promise.then(function(data) {

                    vm.newBloc = {
                        id: data.id,
                        name: data.name,
                        logo: data.logo,
                        description: data.description,
                        is_son_of: data.is_son_of,
                    }
                })
            }else
                {
                    vm.newBloc = {
                        id: null,
                        name: "",
                        logo: "",
                        description: "",
                        is_son_of: null,
                    }
            }

            vm.saveBloc = function () {
                console.log(vm.newBloc);
                if(!edit) {
                    Bloc.save(vm.newBloc, onSaveBlocSuccess, onSaveBlocError)
                }else{
                    Bloc.update(vm.newBloc,onSaveBlocSuccess,onSaveBlocError)
                }
            };

            function onSaveBlocSuccess() {
                console.log('Bloc creation successful');
                $state.go('editCourse')
            }

            function onSaveBlocError(){
                console.log('Bloc creation failed')
            }

            function loadAll(){
                Bloc.query({}, onLoadBlocsSuccess, onLoadBlocsError)
            }

            function onLoadBlocsSuccess(data) {
                vm.blocs = data;
                console.log(data)
            }

            function onLoadBlocsError() {
                console.log('Blocs loading failed')
            }

            loadAll();

        }])

})();
