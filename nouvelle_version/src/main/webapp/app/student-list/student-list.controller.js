(function() {
    'use strict';

    angular
        .module('objectifDtyApp')
        .controller('studentListController', studentListController);

    studentListController.$inject = ['AllStudent','$state','Statistics'];

    function studentListController (AllStudent,$state,Statistics) {
        var vm = this;

       Statistics.getStudents().then(function(data){
           vm.student=data;

           console.log(Statistics.Assiduity(data[0].id))
       })
    }
})();
