(function() {
    'use strict';

    angular
        .module('objectifDtyApp')
        .controller('LessonDeleteController',LessonDeleteController);

    LessonDeleteController.$inject = ['$uibModalInstance', 'entity', 'Lesson'];

    function LessonDeleteController($uibModalInstance, entity, Lesson) {
        var vm = this;

        vm.lesson = entity;
        vm.clear = clear;
        vm.confirmDelete = confirmDelete;
        
        function clear () {
            $uibModalInstance.dismiss('cancel');
        }

        function confirmDelete (id) {
            Lesson.delete({id: id},
                function () {
                    $uibModalInstance.close(true);
                });
        }
    }
})();
