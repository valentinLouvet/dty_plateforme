(function() {
    'use strict';

    angular
        .module('objectifDtyApp')
        .controller('courseCreationController',['$scope', '$state', 'Bloc', 'Lesson', 'Question', 'Response',function ($scope, $state, Bloc, Lesson, Question, Response) {

            this.compteurQuestion = 1;
            this.compteurAnswer = [0];
            this.newLesson = {
                text : "",
                quizz : []
            };

            this.question = {
                intitulate : "Enter question here",
                id: this.compteurQuestion,
                correction : "Correction",
                answers : []
            };

            this.answer = {
                intitulate : "Answer's intitulate",
                correction : "Correction",
                veracity : false,
                id: this.compteurAnswer[0] + 1
            };

            // Initialisation de la 1ère question
            // avec 2 réponses

            var answer1 = {
                intitulate : "Answer " + (this.compteurAnswer[0] + 1),
                correction : "Correction",
                veracity : false,
                id: this.compteurAnswer[0] + 1
            };

            this.compteurAnswer[this.compteurQuestion-1] = this.compteurAnswer[this.compteurQuestion-1] + 1;

            var answer2 = {
                intitulate : "Answer " + (this.compteurAnswer[0] + 1),
                correction : "Correction",
                veracity : false,
                id: this.compteurAnswer[0] + 1
            };

            this.compteurAnswer[this.compteurQuestion-1] = this.compteurAnswer[this.compteurQuestion-1] + 1;

            this.question.answers.push(answer1);
            this.question.answers.push(answer2);

            this.newLesson.quizz.push(this.question);

            console.log("New question created, intitulate : "+this.question.intitulate+", id : "+this.question.id);



            // Différentes fonctions pour ajouter/supprimer les questions/réponses
            // A NOTER : les id commencent à 1
            // et les indices de tableau à 0 (d'où le décalage permanent)

            this.addAnswer = function(idOfQuestion) {

                //console.log("####################");
                //console.log("idOfQuestion : " + idOfQuestion);

                // Création d'une nouvelle réponse correspondant à la question située
                // à l'id idOfQuestion

                var answer = {
                    intitulate : "Answer " + (this.compteurAnswer[idOfQuestion - 1] + 1),
                    correction : "Correction",
                    veracity : false,
                    id : this.compteurAnswer[idOfQuestion - 1] + 1

                }

                this.compteurAnswer[idOfQuestion - 1] = this.compteurAnswer[idOfQuestion - 1] + 1;

                this.newLesson.quizz[idOfQuestion - 1].answers.push(answer);

                console.log("New answer created, intitulate : "+answer.intitulate+", id : "+answer.id);

                //console.log("####################");




            };

            this.removeAnswer = function(idOfAnswer, idOfQuestion){

                // Supprime la réponse dont l'id est idOfAnswer
                // de la question dont l'id est idOfQUestion


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



            }

            this.addQuestion = function() {

                // Ajoute une question à la suite des questions déjà existantes

                this.compteurAnswer.push(0);
                this.compteurQuestion = this.compteurQuestion + 1;

                // Création de deux réponses
                // Une question a toujours au moins 2 réponses

                var answer1 = {
                    intitulate : "Answer 1",
                    veracity : false,
                    correction : "Correction",
                    id: this.compteurAnswer[this.compteurQuestion - 1] + 1
                };

                this.compteurAnswer[this.compteurQuestion - 1] = this.compteurAnswer[this.compteurQuestion - 1] + 1;

                var answer2 = {
                    intitulate : "Answer 2",
                    veracity : false,
                    correction : "Correction",
                    id: this.compteurAnswer[this.compteurQuestion - 1] + 1
                };

                this.compteurAnswer[this.compteurQuestion - 1] = this.compteurAnswer[this.compteurQuestion - 1] + 1;

                var question = {
                    intitulate : "Question n° " + (this.compteurQuestion),
                    id : this.compteurQuestion,
                    correction : "correction",
                    answers : []
                }

                question.answers.push(answer1);
                question.answers.push(answer2);

                this.newLesson.quizz.push(question);

                console.log("New question created, intitulate : "+question.intitulate+", id : "+question.id);

            };

            this.removeQuestion = function(idOfQuestion) {

                // Supprime la question dont l'id est idOfQuestion

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

            };

            // Modifie la véracité de la réponse si la case est cochée ou décochée

            this.modifyVeracity = function(idOfQuestion, idOfAnswer){
                //console.log("modifyVeracity");
                this.newLesson.quizz[idOfQuestion - 1].answers[idOfAnswer - 1].veracity = ! (this.newLesson
                .quizz[idOfQuestion - 1].answers[idOfAnswer - 1].veracity);
                console.log(idOfQuestion + ", " + idOfAnswer);
            };

            // Requêtes http utiles

            /*this.submit = function(){
                Lesson.query({}, onSuccess, onError);

                function onSuccess(data){
                    this.newLesson=data;
                    console.log(data)
                }

                function onError(error){
                    AlertService.error(error.data.message)
                }

                Lesson.save(this.newLesson, onSuccess, onError);
                function onSuccess(data, headers) {
                    this.links = ParseLinks.parse(headers('link'));
                    this.totalItems = headers('X-Total-Count');
                };
                function onError(error) {
                    AlertService.error(error.data.message);
                };
            }*/



        }])


})();
