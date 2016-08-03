(function() {
    'use strict';

    angular
        .module('objectifDtyApp')
        .controller('studentListController', studentListController);

    studentListController.$inject = ['AllStudent','$scope', 'Principal', 'LoginService', '$state','Student'];

    function studentListController (AllStudent,$scope, Principal, LoginService, $state, Student) {
        var vm = this;

        AllStudent.query().$promise.then(function(data){
            vm.student=data;
            console.log(data)
        })

    }
})();
