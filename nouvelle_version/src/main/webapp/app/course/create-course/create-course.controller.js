(function() {
    'use strict';

    angular
        .module('objectifDtyApp')
        .controller('courseCreationController', ['Bloc', 'Question', 'Response', 'Lesson', 'AlertService', function (Bloc, Question, Response, Lesson, AlertService) {

            var vm= this;
            vm.blocs=[];

            this.compteurQuestion = 1;
            this.compteurAnswer = [0];

            this.newLesson = {
                cours : "",
                level : 0,
                num_lesson : 0,
                title : "",
                bloc_id : 0,
                quizz : []
            };

            console.log(vm.newLesson);



            this.question = {
                intitule : "",
                difficulty : 0,
                //lesson_id : this.newLesson.id,
                lesson_id : 0,
                cpt: this.compteurQuestion,
                correction : "",
                answers : []
            };

            this.answer = {
                text : "",
                veracity : false,
                correction: "",
                //question_id: this.newLesson.quizz[this.compteurAnswer[0]].id,
                question_id: 0,
                cpt: this.compteurAnswer[0] + 1
            };

            // Initialisation de la 1ère question
            // avec 2 réponses

            var answer1 = {
                text : "",
                veracity : false,
                correction: "",
                //question_id: this.newLesson.quizz[this.compteurAnswer[0]].id,
                question_id: 0,
                cpt: this.compteurAnswer[0] + 1
            };

            this.compteurAnswer[this.compteurQuestion-1] = this.compteurAnswer[this.compteurQuestion-1] + 1;

            var answer2 = {
                text : "",
                veracity : false,
                correction: "",
                //question_id: this.newLesson.quizz[this.compteurAnswer[0]].id,
                question_id: 0,
                cpt: this.compteurAnswer[0] + 1
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
                    text : "",
                    veracity : false,
                    correction: "",
                    //question_id: this.newLesson.quizz[this.compteurAnswer[idOfQuestion - 1]].id,
                    question_id: 0,
                    cpt: this.compteurAnswer[idOfQuestion - 1] + 1
                }

                this.compteurAnswer[idOfQuestion - 1] = this.compteurAnswer[idOfQuestion - 1] + 1;

                this.newLesson.quizz[idOfQuestion - 1].answers.push(answer);

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



            };

            this.addQuestion = function() {

                // Ajoute une question à la suite des questions déjà existantes

                this.compteurAnswer.push(0);
                this.compteurQuestion = this.compteurQuestion + 1;

                // Création de deux réponses
                // Une question a toujours au moins 2 réponses

                var answer1 = {
                    text : "",
                    veracity : false,
                    correction: "",
                    //question_id: this.newLesson.quizz[this.compteurAnswer[this.compteurQuestion - 1]].id,
                    question_id: 0,
                    cpt: this.compteurAnswer[this.compteurQuestion - 1] + 1
                };

                this.compteurAnswer[this.compteurQuestion - 1] = this.compteurAnswer[this.compteurQuestion - 1] + 1;

                var answer2 = {
                    text : "",
                    veracity : false,
                    correction: "",
                    //question_id: this.newLesson.quizz[this.compteurAnswer[this.compteurQuestion - 1]].id,
                    question_id: 0,
                    cpt: this.compteurAnswer[this.compteurQuestion - 1] + 1
                };

                this.compteurAnswer[this.compteurQuestion - 1] = this.compteurAnswer[this.compteurQuestion - 1] + 1;

                var question = {
                    intitule : "",
                    difficulty : 0,
                    //lesson_id : this.newLesson.id,
                    lesson_id: 0,
                    cpt: this.compteurQuestion,
                    correction : "",
                    answers : []
                }

                question.answers.push(answer1);
                question.answers.push(answer2);

                this.newLesson.quizz.push(question);

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
                            this.newLesson.quizz[i].cpt = this.newLesson.quizz[i].cpt - 1;
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

            //Sauvegarde la question dans la BDD

            /*this.saveLesson = function () {
                Lesson.update(this.newLesson);
            }*/

            this.saveLesson = function() {
                vm.isSaving = true;
                if (vm.newLesson.id !== null) {
                    console.log("vm.newLesson.id !== null");
                    Lesson.update(vm.newLesson, onSaveLessonSuccess, onSaveLessonError);
                } else {
                    console.log("vm.newLesson.id == null");
                    Lesson.save(vm.newLesson, onSaveLessonSuccess, onSaveLessonError);
                }
                console.log(vm.newLesson);
            }

            function onSaveLessonSuccess (result) {
                //$scope.$emit('objectifDtyApp:lessonUpdate', result);
                //$uibModalInstance.close(result);
                vm.isSaving = false;
                console.log("onSaveLessonSuccess");
            }

            function onSaveLessonError () {
                vm.isSaving = false;
                console.log("onSaveLessonError");
            }

            // Recherche la liste des blocs dans la BdD

            function loadAll () {
                Bloc.query({},onSuccess,onError)
            }

            function onSuccess(data){
                vm.blocs=data;
                console.log(data)
            }

            function onError(error){
                AlertService.error(error.data.message)
            }


            loadAll();


        }]);




})();
