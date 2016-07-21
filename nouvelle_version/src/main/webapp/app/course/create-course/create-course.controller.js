(function() {
    'use strict';

    angular
        .module('objectifDtyApp')
        .controller('courseCreationController', courseCreationController);

    function courseCreationController () {

        this.compteurQuestion = 1;
        this.compteurAnswer = [0];
        this.newLesson = {
            text : "",
            quizz : []
        };

        this.question = {
            intitulate : "enter question here",
            id: this.compteurQuestion,
            answers : []
        };

        this.answer = {
            intitulate : "answer's intitulate",
            id: this.compteurAnswer[0] + 1
        };

        // Initialisation de la 1ère question
        // avec 2 réponses

        var answer1 = {
            intitulate : "Answer " + (this.compteurAnswer[0] + 1),
            id: this.compteurAnswer[0] + 1
        };

        this.compteurAnswer[this.compteurQuestion-1] = this.compteurAnswer[this.compteurQuestion-1] + 1;

        var answer2 = {
            intitulate : "Answer " + (this.compteurAnswer[0] + 1),
            id: this.compteurAnswer[0] + 1
        };

        this.compteurAnswer[this.compteurQuestion-1] = this.compteurAnswer[this.compteurQuestion-1] + 1;

        console.log("New answer created, intitulate : "+this.answer.intitulate+", id : "+this.answer.id);
        console.log("New answer created, intitulate : "+this.answer.intitulate+", id : "+this.answer.id);

        this.question.answers.push(answer1);
        this.question.answers.push(answer2);

        this.newLesson.quizz.push(this.question);

        console.log("New question created, intitulate : "+this.question.intitulate+", id : "+this.question.id);
        console.log("Answers of this question : " + this.question.answers);

        // Différentes fonctions pour ajouter/supprimer les questions/réponses



        this.addAnswer = function(idOfQuestion) {

            console.log("####################");
            console.log("idOfQuestion : " + idOfQuestion);

            var answer = {
                intitulate : "Answer " + (this.compteurAnswer[idOfQuestion - 1] + 1),
                id : this.compteurAnswer[idOfQuestion - 1] + 1

            }

            this.compteurAnswer[idOfQuestion - 1] = this.compteurAnswer[idOfQuestion - 1] + 1;

            this.newLesson.quizz[idOfQuestion - 1].answers.push(answer);

            console.log("New answer created, intitulate : "+answer.intitulate+", id : "+answer.id);

            console.log("####################");

        };

        this.removeAnswer = function(idOfAnswer, idOfQuestion){

            console.log("####################");
            console.log("idOfQuestion : " + idOfQuestion);

            if(this.compteurAnswer[idOfQuestion - 1] != 2){
                // Il doit toujours y avoir au moins 2 réponses à une question

                if(idOfAnswer != this.compteurAnswer[idOfQuestion - 1]){
                    // Il faut décaler les id de toutes les réponses qui suivent

                    for(var i=idOfAnswer - 1; i<this.compteurAnswer[idOfQuestion - 1]; i++){
                        this.newLesson.quizz[idOfQuestion - 1].answers[i].id = this.newLesson.quizz[idOfQuestion - 1].answers[i].id - 1;
                        this.newLesson.quizz[idOfQuestion - 1].answers[i].intitulate = "Answer " + this.newLesson.quizz[idOfQuestion - 1].answers[i].id;
                    }

                }
                else{
                    console.log("Last answer...");
                }
                this.newLesson.quizz[idOfQuestion - 1].answers.splice(idOfAnswer - 1, 1);
                this.compteurAnswer[idOfQuestion - 1] = this.compteurAnswer[idOfQuestion - 1] - 1;

            }
            else{
                console.log("Can't delete this answer");
            }


            console.log("####################");



        }

        this.addQuestion = function() {

            console.log("####################");


            this.compteurAnswer.push(0);
            this.compteurQuestion = this.compteurQuestion + 1;

            var answer1 = {
                intitulate : "Answer 1",
                id: this.compteurAnswer[this.compteurQuestion - 1] + 1
            };

            this.compteurAnswer[this.compteurQuestion - 1] = this.compteurAnswer[this.compteurQuestion - 1] + 1;

            var answer2 = {
                intitulate : "Answer 2",
                id: this.compteurAnswer[this.compteurQuestion - 1] + 1
            };

            this.compteurAnswer[this.compteurQuestion - 1] = this.compteurAnswer[this.compteurQuestion - 1] + 1;

            var question = {
                intitulate : "Question n° " + (this.compteurQuestion),
                id : this.compteurQuestion,
                answers : []
            }

            question.answers.push(answer1);
            question.answers.push(answer2);

            this.newLesson.quizz.push(question);

            console.log("New question created, intitulate : "+question.intitulate+", id : "+question.id);
            console.log("####################");

        };

        this.removeQuestion = function(idOfQuestion) {

            console.log("####################");
            console.log("idOfQuestion : " + idOfQuestion);

            // Il faut toujours qu'il y ait au moins une question
            if(this.compteurQuestion != 1){

                if(idOfQuestion != this.compteurQuestion){
                    // il faut changer les id de toutes les questions situées après cette question supprimée
                    // en les décrémentant
                    console.log("This is not the last question");
                    for(var i = idOfQuestion - 1 ; i<this.compteurQuestion; i++){
                        this.newLesson.quizz[i].id = this.newLesson.quizz[i].id - 1;
                    }
                }
                else{
                    console.log("This is the last question");
                }

                this.newLesson.quizz.splice(idOfQuestion - 1, 1);
                this.compteurAnswer.splice(idOfQuestion - 1, 1);
                this.compteurQuestion = this.compteurQuestion - 1;

                console.log("Question deleted");


            }
            else{
                console.log("Can't delete ! At least a question must remain");
            }

            console.log("####################");

        };

    }


})();
