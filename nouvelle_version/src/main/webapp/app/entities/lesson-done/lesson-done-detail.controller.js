(function() {
    'use strict';

    angular
        .module('objectifDtyApp')
        .controller('Lesson_doneDetailController', Lesson_doneDetailController);

    Lesson_doneDetailController.$inject = ['$scope', '$rootScope', '$stateParams', 'entity', 'Lesson_done', 'Student', 'Lesson'];

    function Lesson_doneDetailController($scope, $rootScope, $stateParams, entity, Lesson_done, Student, Lesson) {
        var vm = this;

        vm.lesson_done = entity;

        var unsubscribe = $rootScope.$on('objectifDtyApp:lesson_doneUpdate', function(event, result) {
            vm.lesson_done = result;
        });
        $scope.$on('$destroy', unsubscribe);
    }
})();
