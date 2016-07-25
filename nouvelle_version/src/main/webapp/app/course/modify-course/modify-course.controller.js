(function () {
   'use strict';

    angular
        .module('objectifDtyApp')
        .controller('courseModifyController',['$cookies', function ($cookies) {
            var vm=this;
           vm.course=$cookies.getObject('course')
            console.log(vm.course)


        }])
})();
