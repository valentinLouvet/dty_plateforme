(function () {
    'use strict';

    angular
        .module('objectifDtyApp')
        .controller('progressionController', progressionController)


    progressionController.$inject = ['Student', '$scope', 'Principal', 'LoginService', 'Lesson_done', '$state'];

    function progressionController(Student, $scope, Principal, LoginService, Lesson_done, $state) {

        var vm = this;
        var Blocs = [];

        Principal.getStudent().then(function (data) {
            vm.student = data;
            vm.user = data.user;

            Lesson_doneWithBlockId.get({},function(lessons){
                // Renvoie les dates à laquelle l'utilisateur a fait ses leçons
                // pour la première fois


            });
        });





    }
})();
