(function() {
    'use strict';

    angular
        .module('objectifDtyApp')
        .controller('editCreationController', courseCreationController);

    courseCreationController.$inject = ['Sessions', 'Principal'];

    function courseCreationController () {

        this.lessons = [];
        this.editedLesson = {
            text : "",
            quizz : []
        };
        this.question = {
            question : "enter question here",
            answers : []
        };
        this.question.answers.push("answer 1");
        this.question.answers.push("answer 2");
        this.addAnswer = function () {
            this.question.answers.push("answer " + (this.question.answers.length+1) );
        };
        this.newLesson.quizz.push(this.question);
        this.addQuestion = function () {
            this.question = {
                question : "enter question here",
                answers : []
            };
            this.question.answers.push("answer 1");
            this.question.answers.push("answer 2");
            this.addAnswer = function () {
                this.question.answers.push("answer " + (this.question.answers.length+1) );
            };
            this.newLesson.quizz.push(this.question);
        };

    }
})();
