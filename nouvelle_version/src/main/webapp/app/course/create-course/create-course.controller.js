(function() {
    'use strict';

    angular
        .module('objectifDtyApp')
        .controller('courseCreationController', ['Bloc', 'Question', 'Response', 'Lesson', 'AlertService', function (Bloc, Question, Response, Lesson, AlertService) {

            var vm= this;
            vm.blocs=[];

            this.compteurQuestion = 1;
            this.compteurAnswer = [0];

            this.quizz = [];
            this.answers = [];

            this.newLesson = {
                cours : null,
                level : null,
                num_lesson : null,
                title : null,
                id : null,
                bloc : null
            };

            console.log(vm.newLesson);



            this.question = {
                id : null,
                intitule : "",
                difficulty : 0,
                //lesson_id : this.newLesson.id,
                lesson : null,
                cpt: this.compteurQuestion,
                correction : ""
            };

            /*this.answer = {
                id : null,
                text : "",
                veracity : false,
                correction: "",
                //question_id: this.newLesson.quizz[this.compteurAnswer[0]].id,
                question: null,
                cpt: this.compteurAnswer[0] + 1
            };*/

            // Initialisation de la 1ère question
            // avec 2 réponses

            var answer1 = {
                id : null,
                text : "",
                veracity : false,
                correction: "",
                //question_id: this.newLesson.quizz[this.compteurAnswer[0]].id,
                question: null,
                cpt: this.compteurAnswer[0] + 1
            };

            this.compteurAnswer[this.compteurQuestion-1] = this.compteurAnswer[this.compteurQuestion-1] + 1;

            var answer2 = {
                id : null,
                text : "",
                veracity : false,
                correction: "",
                //question_id: this.newLesson.quizz[this.compteurAnswer[0]].id,
                question: null,
                cpt: this.compteurAnswer[0] + 1
            };

            this.compteurAnswer[this.compteurQuestion-1] = this.compteurAnswer[this.compteurQuestion-1] + 1;

            this.answers.push([answer1, answer2]);
            this.quizz.push(this.question);

            console.log("Answers : ");
            console.log(this.answers);

            console.log("Questions :");
            console.log(this.quizz);

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
                    id : null,
                    text : "",
                    veracity : false,
                    correction: "",
                    //question_id: this.newLesson.quizz[this.compteurAnswer[idOfQuestion - 1]].id,
                    question: 0,
                    cpt: this.compteurAnswer[idOfQuestion - 1] + 1
                };

                this.compteurAnswer[idOfQuestion - 1] = this.compteurAnswer[idOfQuestion - 1] + 1;

                this.answers[idOfQuestion - 1].push(answer);

                console.log("New answer created : " + answer);

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
                            this.answers[idOfQuestion - 1][i].id = this.answers[idOfQuestion - 1][i].id - 1;
                            this.answers[idOfQuestion - 1][i].intitulate = "Answer " + this.answers[idOfQuestion - 1][i].id;
                        }

                    }
                    else{
                        console.log("Last answer...");
                    }
                    this.answers[idOfQuestion - 1].splice(idOfAnswer - 1, 1);
                    this.compteurAnswer[idOfQuestion - 1] = this.compteurAnswer[idOfQuestion - 1] - 1;

                }
                else{
                    console.log("Can't delete this answer");
                }



            };

            this.addQuestion = function() {

                // Ajoute une question à la suite des questions déjà existantes

                this.compteurAnswer.push(0);
                this.compteurQuestion = this.compteurQuestion + 1;

                // Création de deux réponses
                // Une question a toujours au moins 2 réponses

                var answer1 = {
                    id : null,
                    text : "",
                    veracity : false,
                    correction: "",
                    //question_id: this.newLesson.quizz[this.compteurAnswer[this.compteurQuestion - 1]].id,
                    question_id: 0,
                    cpt: this.compteurAnswer[this.compteurQuestion - 1] + 1
                };

                this.compteurAnswer[this.compteurQuestion - 1] = this.compteurAnswer[this.compteurQuestion - 1] + 1;

                var answer2 = {
                    id : null,
                    text : "",
                    veracity : false,
                    correction: "",
                    //question_id: this.newLesson.quizz[this.compteurAnswer[this.compteurQuestion - 1]].id,
                    question_id: 0,
                    cpt: this.compteurAnswer[this.compteurQuestion - 1] + 1
                };

                this.compteurAnswer[this.compteurQuestion - 1] = this.compteurAnswer[this.compteurQuestion - 1] + 1;

                var question = {
                    id : null,
                    intitule : "",
                    difficulty : 0,
                    //lesson_id : this.newLesson.id,
                    lesson_id: 0,
                    cpt: this.compteurQuestion,
                    correction : ""
                };

                this.answers.push([answer1, answer2]);

                this.quizz.push(question);

                console.log("New question created " + question);

            };

            this.removeQuestion = function(idOfQuestion) {

                // Supprime la question dont le cpt est idOfQuestion

                console.log("idOfQuestion : " + idOfQuestion);

                // Il faut toujours qu'il y ait au moins une question
                if(this.compteurQuestion != 1){

                    if(idOfQuestion != this.compteurQuestion){
                        // il faut changer les id de toutes les questions situées après cette question supprimée
                        // en les décrémentant
                        console.log("This is not the last question");
                        for(var i = idOfQuestion - 1 ; i<this.compteurQuestion; i++){
                            this.quizz[i].cpt = this.quizz[i].cpt - 1;
                        }
                    }
                    else{
                        console.log("This is the last question");
                    }

                    this.quizz.splice(idOfQuestion - 1, 1);
                    this.answers.splice(idOfQuestion - 1, 1);
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
                this.answers[idOfQuestion - 1][idOfAnswer - 1].veracity = ! (this.answers[idOfQuestion - 1]
                [idOfAnswer - 1].veracity);
                console.log(idOfQuestion + ", " + idOfAnswer);
            };

            //Sauvegarde la leçon dans la BdD

            this.saveLesson = function() {
                console.log(vm.newLesson.id);

                console.log("Je passe ici");

                vm.isSaving = true;

                console.log("Je vais sauvegarder la leçon");

                // Lesson.save renvoie la leçon qui a été sauvagardée en lui donnant un id
                vm.newLesson = Lesson.save(vm.newLesson, onSaveLessonSuccess, onSaveLessonError);
                console.log(vm.newLesson);
                console.log("Je passe là");

                console.log(vm.newLesson);
            };

            this.saveQuestion = function(){
              console.log("Je rentre dans cette fonction saveQuestion");
              vm.quizz[0].lesson = vm.newLesson;
              // Question.save renvoie la leçon qui a été sauvegardée en lui donnant un id
              Question.save(vm.quizz[0], onSaveQuestionSuccess, onSaveQuestionError);
              console.log("Question saved :");
              console.log(vm.quizz[0]);
            };

            function onSaveLessonSuccess () {
                //$scope.$emit('objectifDtyApp:lessonUpdate', result);
                //$uibModalInstance.close(result);
                vm.isSaving = false;
                console.log("onSaveLessonSuccess");
                vm.saveQuestion();
            }

            function onSaveLessonError () {
                vm.isSaving = false;
                console.log("onSaveLessonError");
            }

            function onSaveQuestionSuccess(){
                vm.isSaving = false;
                console.log("onSaveQuestionSuccess");
                //vm.saveLesson();
            }

            function onSaveQuestionError(){
                vm.isSaving = false;
                console.log("onSaveQuestionError");
            }

            // Recherche la liste des blocs dans la BdD

            function loadAll () {

                Bloc.query({},onSuccess,onError)
            }

            function onSuccess(data){
                vm.blocs=data;
                console.log(data);
            }

            function onError(error){

                AlertService.error(error.data.message);
            }


            loadAll();




        }]);




})();
