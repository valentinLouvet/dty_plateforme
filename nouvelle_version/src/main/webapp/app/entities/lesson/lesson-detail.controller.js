(function() {
    'use strict';

    angular
        .module('objectifDtyApp')
        .controller('LessonDetailController', LessonDetailController);

    LessonDetailController.$inject = ['$scope', '$rootScope', '$stateParams', 'DataUtils', 'entity', 'Lesson', 'Coach', 'Bloc', 'Question'];

    function LessonDetailController($scope, $rootScope, $stateParams, DataUtils, entity, Lesson, Coach, Bloc, Question) {
        var vm = this;

        vm.lesson = entity;
        vm.byteSize = DataUtils.byteSize;
        vm.openFile = DataUtils.openFile;

        var unsubscribe = $rootScope.$on('objectifDtyApp:lessonUpdate', function(event, result) {
            vm.lesson = result;
        });
        $scope.$on('$destroy', unsubscribe);
    }
})();
