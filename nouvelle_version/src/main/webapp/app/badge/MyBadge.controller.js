(function() {
    'use strict';

    angular
        .module('objectifDtyApp')
        .controller('MyBadgeController',MyBadgeController);

            MyBadgeController.$inject = ['$uibModalInstance', '$state', '$stateParams', 'BadgeView', 'items', 'Lesson'];

            function MyBadgeController($uibModalInstance, $state, $stateParams, BadgeView, items, Lesson) {
            var vm = this;

            vm.blocName = items.title;
            vm.ImagePath = items.path;


            function clear () {
                $uibModalInstance.dismiss('cancel');
            }

             vm.close = function() {

             $uibModalInstance.close(true);
             //$state.go('viewCourse', {id: $stateParams.idLesson});
             }
         }
    })();
