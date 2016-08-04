(function() {
    'use strict';

    angular
        .module('objectifDtyApp')
        .controller('studentListController', studentListController);

    studentListController.$inject = ['AllStudent','$state','Statistics'];

    function studentListController (AllStudent,$state,Statistics) {
        var vm = this;

        AllStudent.query().$promise.then(function(data){
            vm.student=data;
            console.log(data)
        })
    }
})();
