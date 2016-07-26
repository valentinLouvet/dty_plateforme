(function() {
    'use strict';

    angular
        .module('objectifDtyApp')
        .controller('progressionController', progressionController);

    progressionController.$inject = ['Student','$scope', 'Principal', 'LoginService', '$state'];

    function progressionController (Student,$scope, Principal,LoginService, $state) {
        var vm = this;
        var user=Principal.identity().$$state;
        var student=Principal.getStudent().$$state;

        vm.blocs=[];
        vm.identity=user;

        console.log(user);
        console.log(student)

    }
})();
