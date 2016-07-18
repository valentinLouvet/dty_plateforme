app.controller('creationCoursController', function ($scope) {
    $scope.lessons = [];
    $scope.newLesson = {
        text : "",
        quizz : []
    };
    $scope.question = {
        question : "enter question here",
        answers : []
    };
    $scope.question.answers.push("answer 1");
    $scope.question.answers.push("answer 2");
    $scope.addAnswer = function () {
        $scope.question.answers.push("answer " + ($scope.question.answers.length+1) );
    };
    $scope.newLesson.quizz.push($scope.question);
    $scope.addQuestion = function () {
        $scope.question = {
            question : "enter question here",
            answers : []
        };
        $scope.question.answers.push("answer 1");
        $scope.question.answers.push("answer 2");
        $scope.addAnswer = function () {
            $scope.question.answers.push("answer " + ($scope.question.answers.length+1) );
        };
        $scope.newLesson.quizz.push($scope.question);
    };

});