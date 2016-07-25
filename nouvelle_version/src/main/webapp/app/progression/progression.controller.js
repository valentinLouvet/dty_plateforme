(function() {
    'use strict';

    angular
        .module('objectifDtyApp')
        .controller('progressionController', progressionController);

    progressionController.$inject = ['Student','$scope', 'Principal', 'LoginService', '$state'];

    function progressionController (Student,$scope, Principal,LoginService, $state) {
        var vm = this;
        var user=Principal.identity().$$state.value;
        var student=Student.query().$promise;
        vm.blocs = blocs;
        vm.identity=user;

        vm.student=[];
        student.then(function(data){
            vm.student=data[0];
            console.log(vm.student)
        });

        console.log(user);


    }
})();

var blocs = [
    {
        name: "Git",
        level: 100,
        description: "Versioning",
        coursesToDo: 1,
        image: "/content/images/git2.png",
        link: 'cours'
    },
    {
        name: "HTML 5",
        level: 100,
        description: "Website Skeleton",
        coursesToDo: 0,
        image: "/content/images/html5_2.png",
        link: '#'
    },
    {
        name: "AngularJS",
        level: 27,
        description: "Front-End Javascript",
        coursesToDo: 5,
        image: '/content/images/angularjs2.png',
        link: '#'
    },
    {
        name: "NodeJS",
        level: 0,
        description: "Back-End Javascript",
        coursesToDo: 8,
        image: "/content/images/nodejs4.png",
        link: '#'
    },
    {
        name: "Python",
        level: 0,
        description: "Already learned in prepa !",
        coursesToDo: 2,
        image: "/content/images/python2.png",
        link: '#'
    },
    {
        name: "Android",
        level: 0,
        description: "Smartphone Applications",
        coursesToDo: 5,
        image: "/content/images/android-studio2.png",
        link: '#'
    }
];
