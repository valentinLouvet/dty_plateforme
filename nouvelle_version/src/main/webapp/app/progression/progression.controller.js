(function() {
    'use strict';

    angular
        .module('objectifDtyApp')
        .controller('progressionController', progressionController);

    progressionController.$inject = ['Student','$scope', 'Principal', 'LoginService', '$state'];

    function progressionController (Student,$scope, Principal,LoginService, $state) {

        var vm=this;

        Principal.getStudent().then(function (data) {
            vm.student=data;
            vm.user=vm.student.user;
            console.log(vm.user);
    });



    }
})();
