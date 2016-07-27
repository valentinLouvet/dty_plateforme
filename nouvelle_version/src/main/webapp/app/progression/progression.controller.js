(function() {
    'use strict';

    angular
        .module('objectifDtyApp')
        .controller('progressionController', progressionController);

    progressionController.$inject = ['Student','$scope', 'Principal', 'LoginService','Lesson_done', '$state'];

    function progressionController (Student,$scope, Principal, LoginService, Lesson_done, $state) {

        var vm=this;
        vm.lesson_dones=[];

        Principal.getStudent().then(function (data) {
            vm.student=data;
            vm.user=data.user;

            Lesson_done.query({},function(lessons){
                console.log(lessons);
                for(var i=0;i<lessons.length;i++){
                    Lesson_done.get({id:lessons[i].id},function (data) {
                        vm.lesson_dones.push(data);
                    })
                }
            });


    });
    }
})();
