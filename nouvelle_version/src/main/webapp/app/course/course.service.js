(function () {
    'use strict';

    angular
        .module('objectifDtyApp')
        .factory('courseService', courseService);


    function courseService () {
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
        }
});
