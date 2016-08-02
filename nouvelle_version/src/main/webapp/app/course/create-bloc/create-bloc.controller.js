(function () {
    'use strict';

    angular
        .module('objectifDtyApp')
        .controller('blocCreationController',['Bloc', function (Bloc) {
            var vm = this;

            vm.blocs = [];

            vm.newBloc = {
                id: null,
                name: "",
                logo: "",
                description: "",
                is_son_of: null,
            };

            vm.saveBloc = function () {
                console.log(vm.newBloc);
                Bloc.save(vm.newBloc, onSaveBlocSuccess, onSaveBlocError)
            };

            function onSaveBlocSuccess() {
                console.log('Bloc creation successful')
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
