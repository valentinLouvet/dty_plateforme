(function() {
    'use strict';

    angular
        .module('objectifDtyApp')
        .controller('studentListController', studentListController);

    studentListController.$inject = ['$scope', 'Principal', 'LoginService', '$state'];

    function studentListController ($scope, Principal, LoginService, $state) {
        var vm = this;

        vm.students = students;

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
