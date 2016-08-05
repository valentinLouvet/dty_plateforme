'use strict';

describe('Controller Tests', function() {

    describe('Bloc Management Detail Controller', function() {
        var $scope, $rootScope;
        var MockEntity, MockBloc, MockLesson, MockImage;
        var createController;

        beforeEach(inject(function($injector) {
            $rootScope = $injector.get('$rootScope');
            $scope = $rootScope.$new();
            MockEntity = jasmine.createSpy('MockEntity');
            MockBloc = jasmine.createSpy('MockBloc');
            MockLesson = jasmine.createSpy('MockLesson');
            MockImage = jasmine.createSpy('MockImage');
            

            var locals = {
                '$scope': $scope,
                '$rootScope': $rootScope,
                'entity': MockEntity ,
                'Bloc': MockBloc,
                'Lesson': MockLesson,
                'Image': MockImage
            };
            createController = function() {
                $injector.get('$controller')("BlocDetailController", locals);
            };
        }));


        describe('Root Scope Listening', function() {
            it('Unregisters root scope listener upon scope destruction', function() {
                var eventType = 'objectifDtyApp:blocUpdate';

                createController();
                expect($rootScope.$$listenerCount[eventType]).toEqual(1);

                $scope.$destroy();
                expect($rootScope.$$listenerCount[eventType]).toBeUndefined();
            });
        });
    });

});
