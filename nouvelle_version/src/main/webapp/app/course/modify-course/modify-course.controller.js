(function () {
   'use strict';

    angular
        .module('objectifDtyApp')
        .controller('courseModifyController',['$cookies', function ($cookies) {
            this.course=$cookies.getObject('course')


        }])
})();
