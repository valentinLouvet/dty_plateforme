(function() {
    'use strict';

    angular
        .module('objectifDtyApp')
        .controller('courseCreationController', courseCreationController);

    function courseCreationController () {
        this.compteur= 0;
        this.newLesson = {
            text : "",
            quizz : []
        };

        this.question = {
            question : "enter question here",
            id: this.compteur,
            answers : []
        };

        this.newLesson.quizz.push(this.question);
        this.question.answers.push("answer 1");
        this.question.answers.push("answer 2");

        this.addAnswer = function (i) {
            this.newLesson.quizz[i].answers.push("answer " + (this.newLesson.quizz[i].answers.length+1) );
        };

        this.addQuestion = function () {
            this.compteur= this.compteur+1;
            var question = {
                question : "enter question here",
                id: this.compteur,
                answers : []
            };
            question.answers.push("answer 1");
            question.answers.push("answer 2");
            this.newLesson.quizz.push(question);
        };

        this.removeQuestion = function (i) {
            this.newLesson.quizz[i].answers = null;
            this.newLesson.quizz[i].question = null;
        }

    }
})();
