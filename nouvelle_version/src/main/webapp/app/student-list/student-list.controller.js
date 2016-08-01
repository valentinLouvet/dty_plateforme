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

var students = [
    {
        name: 'Student 1',
        assiduity: '100',
        available: 'Available'

    },
    {
        name: 'Student 2',
        assiduity: '47',
        available: 'Gave Up'
    },
    {
        name: 'Student 3',
        assiduity: '86',
        available: 'Unavailable: exams'
    },
    {
        name: 'Student 4',
        assiduity: '12',
        available: 'Gave Up'
    }
];
