(function() {
    'use strict';

    angular
        .module('objectifDtyApp')
        .controller('QuestionDetailController', QuestionDetailController);

    QuestionDetailController.$inject = ['$scope', '$rootScope', '$stateParams', 'entity', 'Question', 'Lesson', 'Response'];

    function QuestionDetailController($scope, $rootScope, $stateParams, entity, Question, Lesson, Response) {
        var vm = this;

        vm.question = entity;

        var unsubscribe = $rootScope.$on('objectifDtyApp:questionUpdate', function(event, result) {
            vm.question = result;
        });
        $scope.$on('$destroy', unsubscribe);
    }
})();
