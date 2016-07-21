(function () {
    'use strict';

    angular
        .module('objectifDtyApp')
        .factory('courseService', function  () {
            var course = {};

            function get() {
                return course
            }

            function set(course) {
                this.course = course;
            }

            return {
                message: "truc"
            }
        });

});
