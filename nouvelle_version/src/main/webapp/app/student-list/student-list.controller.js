(function() {
    'use strict';

    angular
        .module('objectifDtyApp')
        .controller('studentListController', studentListController);

    studentListController.$inject = ['AllStudent','$scope', 'Principal', 'LoginService', '$state','Student','Lesson_doneWid'];

    function studentListController (AllStudent,$scope, Principal, LoginService, $state, Student,Lesson_doneWid) {
        var vm = this;

        AllStudent.query().$promise.then(function(data){
            vm.student=data;
            console.log(data)
        })

    }
})();
