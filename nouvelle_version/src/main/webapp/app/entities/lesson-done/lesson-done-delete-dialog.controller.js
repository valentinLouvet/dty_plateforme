(function() {
    'use strict';

    angular
        .module('objectifDtyApp')
        .controller('Lesson_doneDeleteController',Lesson_doneDeleteController);

    Lesson_doneDeleteController.$inject = ['$uibModalInstance', 'entity', 'Lesson_done'];

    function Lesson_doneDeleteController($uibModalInstance, entity, Lesson_done) {
        var vm = this;

        vm.lesson_done = entity;
        vm.clear = clear;
        vm.confirmDelete = confirmDelete;
        
        function clear () {
            $uibModalInstance.dismiss('cancel');
        }

        function confirmDelete (id) {
            Lesson_done.delete({id: id},
                function () {
                    $uibModalInstance.close(true);
                });
        }
    }
})();
