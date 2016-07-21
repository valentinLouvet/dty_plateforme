'use strict';

describe('Controller Tests', function() {

    describe('Lesson_done Management Detail Controller', function() {
        var $scope, $rootScope;
        var MockEntity, MockLesson_done, MockStudent, MockLesson;
        var createController;

        beforeEach(inject(function($injector) {
            $rootScope = $injector.get('$rootScope');
            $scope = $rootScope.$new();
            MockEntity = jasmine.createSpy('MockEntity');
            MockLesson_done = jasmine.createSpy('MockLesson_done');
            MockStudent = jasmine.createSpy('MockStudent');
            MockLesson = jasmine.createSpy('MockLesson');
            

            var locals = {
                '$scope': $scope,
                '$rootScope': $rootScope,
                'entity': MockEntity ,
                'Lesson_done': MockLesson_done,
                'Student': MockStudent,
                'Lesson': MockLesson
            };
            createController = function() {
                $injector.get('$controller')("Lesson_doneDetailController", locals);
            };
        }));


        describe('Root Scope Listening', function() {
            it('Unregisters root scope listener upon scope destruction', function() {
                var eventType = 'objectifDtyApp:lesson_doneUpdate';

                createController();
                expect($rootScope.$$listenerCount[eventType]).toEqual(1);

                $scope.$destroy();
                expect($rootScope.$$listenerCount[eventType]).toBeUndefined();
            });
        });
    });

});
