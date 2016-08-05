(function() {
    'use strict';

    angular
        .module('objectifDtyApp')
        .controller('studentListController', studentListController);

    studentListController.$inject = ['AllStudent','$state','Statistics'];

    function studentListController (AllStudent,$state,Statistics) {
        var vm = this;
        var students=[];

       Statistics.getStudents().then(function(data){

          var studentData=data;
           console.log(data);

           for(var i=0;i<studentData.length;i++){
               console.log(Statistics.Assiduity(studentData[i].id));
              // Statistics.Assiduity(data[i].id).$promise.then(function(data){
                  // var ass=data;
                   //students.push({'data':data,'assiduity':ass})
             //  });

           }
       })
    }
})();
