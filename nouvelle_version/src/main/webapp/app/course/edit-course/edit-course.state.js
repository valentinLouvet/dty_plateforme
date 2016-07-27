// Lesson.state : pour tous les états relatifs à la leçon à savoir : view, edit, create. ( edit et create ? )
(function(){

    angular.module('objectifDtyApp').config(stateConfig);
    stateConfig.$inject = ['$stateProvider'];

    function stateConfig($stateProvider) {
        $stateProvider
        .state('editCourse', {

            parent: 'course',
            url: '/edit',
            data: {
                authorities:['ROLE_COACH','ROLE_ADMIN'],
                pageTitle: 'Edit Course'
            },
            views: {
                'content@': {
                    templateUrl: 'app/course/edit-course/edit-course.html',
                    controller: 'courseEditionController',
                    controllerAs: 'vm'
                }
            }

        })
        .state('editCourse.delete', {
                    parent: 'editCourse',
                    url: '/{id}/delete',
                    data: {
                        authorities: ['ROLE_COACH','ROLE_ADMIN']
                    },
                    onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                        $uibModal.open({
                            templateUrl: 'app/entities/lesson/lesson-delete-dialog.html',
                            controller: 'LessonDeleteController',
                            controllerAs: 'vm',
                            size: 'md',
                            resolve: {
                                entity: ['Lesson', function(Lesson) {
                                    return Lesson.get({id : $stateParams.id}).$promise;
                                }]
                            }
                        }).result.then(function() {
                            $state.go('editCourse', null, { reload: true });
                        }, function() {
                            $state.go('^');
                        });
                    }]
         });

    }


}());

