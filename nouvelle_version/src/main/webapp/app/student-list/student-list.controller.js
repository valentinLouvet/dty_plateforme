(function() {
    'use strict';

    angular
        .module('objectifDtyApp')
        .controller('studentListController', studentListController);

    HomeController.$inject = ['$scope', 'Principal', 'LoginService', '$state'];

    function HomeController ($scope, Principal, LoginService, $state) {
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
    }
];
