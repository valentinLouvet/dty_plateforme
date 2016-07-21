'use strict';

describe('Controller Tests', function() {

    describe('Lesson Management Detail Controller', function() {
        var $scope, $rootScope;
        var MockEntity, MockLesson, MockCoach, MockBloc, MockQuestion;
        var createController;

        beforeEach(inject(function($injector) {
            $rootScope = $injector.get('$rootScope');
            $scope = $rootScope.$new();
            MockEntity = jasmine.createSpy('MockEntity');
            MockLesson = jasmine.createSpy('MockLesson');
            MockCoach = jasmine.createSpy('MockCoach');
            MockBloc = jasmine.createSpy('MockBloc');
            MockQuestion = jasmine.createSpy('MockQuestion');
            

            var locals = {
                '$scope': $scope,
                '$rootScope': $rootScope,
                'entity': MockEntity ,
                'Lesson': MockLesson,
                'Coach': MockCoach,
                'Bloc': MockBloc,
                'Question': MockQuestion
            };
            createController = function() {
                $injector.get('$controller')("LessonDetailController", locals);
            };
        }));


        describe('Root Scope Listening', function() {
            it('Unregisters root scope listener upon scope destruction', function() {
                var eventType = 'objectifDtyApp:lessonUpdate';

                createController();
                expect($rootScope.$$listenerCount[eventType]).toEqual(1);

                $scope.$destroy();
                expect($rootScope.$$listenerCount[eventType]).toBeUndefined();
            });
        });
    });

});
