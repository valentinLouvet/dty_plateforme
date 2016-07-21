(function() {
    'use strict';

    angular
        .module('objectifDtyApp')
        .controller('StudentDetailController', StudentDetailController);

    StudentDetailController.$inject = ['$scope', '$rootScope', '$stateParams', 'entity', 'Student', 'Badge', 'User', 'Lesson', 'Lesson_done'];

    function StudentDetailController($scope, $rootScope, $stateParams, entity, Student, Badge, User, Lesson, Lesson_done) {
        var vm = this;

        vm.student = entity;

        var unsubscribe = $rootScope.$on('objectifDtyApp:studentUpdate', function(event, result) {
            vm.student = result;
        });
        $scope.$on('$destroy', unsubscribe);
    }
})();
