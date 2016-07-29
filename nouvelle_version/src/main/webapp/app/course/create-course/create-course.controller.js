(function() {
    'use strict';

    angular
        .module('objectifDtyApp')
        .controller('courseCreationController', ['Bloc', 'Question', 'Response', 'Lesson', 'AlertService', 'Principal', function (Bloc, Question, Response, Lesson, AlertService, Principal) {

            var vm= this;
            vm.blocs=[];
            vm.lessons = [];
            vm.num_lesson = null;

            // LEVEL of the LESSON //

            vm.MAX_LEVEL = 30;
            vm.tabLevel = [];

            for(var i = 0; i<vm.MAX_LEVEL; i++){
                vm.tabLevel[i] = i+1;
            }

            // IDENTITY OF THE USER-COACH //

            vm.coach;

            Principal.getCoach().then(function(coach){
                vm.coach = coach;
                //console.log(coach.id);
            });


            ///////////////////////////////////////////////
            // Variables utilisées lors de la sauvegarde //
            ///////////////////////////////////////////////

            this.compteurQuestion = 1;
            this.compteurAnswer = [0];

            vm.compteurQuestionSaved = 0;

            vm.indexOfAnswer = 0;
            vm.indexOfQuestion = 0;

            this.quizz = [];
            this.answers = [];

            this.newLesson = {
                cours : null,
                level : null,
                num_lesson : null,
                title : null,
                id : null,
                bloc : null,
                created_by : null // id du coach connecté
            };

            this.question = {
                id : null,
                intitule : null,
                difficulty : null,
                lesson : null,
                cpt: this.compteurQuestion,
                correction : null
            };

            // Initialisation de la 1ère question
            // avec 2 réponses

            var answer1 = {
                id : null,
                text : null,
                veracity : false,
                correction: null,
                question: null,
                cpt: this.compteurAnswer[0] + 1
            };

            this.compteurAnswer[this.compteurQuestion-1] = this.compteurAnswer[this.compteurQuestion-1] + 1;

            var answer2 = {
                id : null,
                text : null,
                veracity : false,
                correction: null,
                question: null,
                cpt: this.compteurAnswer[0] + 1
            };

            this.compteurAnswer[this.compteurQuestion-1] = this.compteurAnswer[this.compteurQuestion-1] + 1;

            this.answers.push([answer1, answer2]);
            this.quizz.push(this.question);

            // Différentes fonctions pour ajouter/supprimer les questions/réponses
            // A NOTER : les id (index) commencent à 1
            // et les indices de tableau à 0 (d'où le décalage permanent)

            this.addAnswer = function(idOfQuestion) {

                // Création d'une nouvelle réponse correspondant à la question située
                // à l'id idOfQuestion

                var answer = {
                    id : null,
                    text : null,
                    veracity : false,
                    correction : null,
                    //question_id: this.newLesson.quizz[this.compteurAnswer[idOfQuestion - 1]].id,
                    question : 0,
                    cpt: this.compteurAnswer[idOfQuestion - 1] + 1
                };

                this.compteurAnswer[idOfQuestion - 1] = this.compteurAnswer[idOfQuestion - 1] + 1;

                this.answers[idOfQuestion - 1].push(answer);

            };

            this.removeAnswer = function(idOfAnswer, idOfQuestion){

                // Supprime la réponse dont l'id est idOfAnswer
                // de la question dont l'id est idOfQUestion

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
                    text : null,
                    veracity : false,
                    correction: null,
                    question : 0,
                    cpt: this.compteurAnswer[this.compteurQuestion - 1] + 1
                };

                this.compteurAnswer[this.compteurQuestion - 1] = this.compteurAnswer[this.compteurQuestion - 1] + 1;

                var answer2 = {
                    id : null,
                    text : null,
                    veracity : false,
                    correction: null,
                    question : 0,
                    cpt: this.compteurAnswer[this.compteurQuestion - 1] + 1
                };

                this.compteurAnswer[this.compteurQuestion - 1] = this.compteurAnswer[this.compteurQuestion - 1] + 1;

                var question = {
                    id : null,
                    intitule : null,
                    difficulty : 0,
                    lesson : 0,
                    cpt: this.compteurQuestion,
                    correction : null
                };

                this.answers.push([answer1, answer2]);

                this.quizz.push(question);


            };

            this.removeQuestion = function(idOfQuestion) {

                // Supprime la question dont le cpt est idOfQuestion

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
                this.answers[idOfQuestion - 1][idOfAnswer - 1].veracity = ! (this.answers[idOfQuestion - 1]
                [idOfAnswer - 1].veracity);
            };

            //Sauvegarde la leçon dans la BdD

            this.saveLesson = function() {

                vm.isSaving = true;

                vm.num_lesson = vm.numberLessonForNewLesson(vm.newLesson.bloc.id);
                vm.newLesson.created_by = vm.coach;
                vm.newLesson.num_lesson = vm.num_lesson;
                console.log("vm.newLesson.num_lesson : " + vm.newLesson.num_lesson);

                // Lesson.save renvoie la leçon qui a été sauvegardée en lui donnant un id
                // Sauvegarde par la même occasion la leçon

                vm.newLesson = Lesson.save(vm.newLesson, onSaveLessonSuccess, onSaveLessonError);

            };

            this.saveQuestion = function(indexOfQuestion){

                // On enregistre le compteur de la question sur la page pour conserver
                // un affichage correct des réponses après la sauvegarde

                vm.quizz[indexOfQuestion].lesson = vm.newLesson;
                // Question.save renvoie la leçon qui a été sauvegardée en lui donnant un id
                vm.quizz[indexOfQuestion] = Question.save(vm.quizz[indexOfQuestion], onSaveQuestionSuccess, onSaveQuestionError);

            };

            this.saveResponse = function(indexOfQuestion, indexOfAnswer){

                // On passe la question sauvegardée en attribut question de la réponse
                vm.answers[indexOfQuestion][indexOfAnswer].question = vm.quizz[indexOfQuestion];
                // On sauvegarde la réponse
                vm.answers[indexOfQuestion][indexOfAnswer] = Response.save(vm.answers[indexOfQuestion][indexOfAnswer], onSaveResponseSuccess, onSaveResponseError);

            };

            function onSaveResponseSuccess (){

                vm.isSaving = false;

                // Il faut parcourir tout le tableau answers "sans déborder"
                if(vm.indexOfAnswer < vm.answers[vm.indexOfQuestion].length - 1){
                    vm.indexOfAnswer ++;
                    vm.saveResponse(vm.indexOfQuestion, vm.indexOfAnswer);
                }
                else{
                    vm.indexOfAnswer = 0;
                    if(vm.indexOfQuestion != vm.quizz.length - 1){
                        vm.indexOfQuestion ++;
                        vm.saveResponse(vm.indexOfQuestion, vm.indexOfAnswer);
                    }
                }
            }

            function onSaveResponseError () {
                vm.isSaving = false;

            }

            function onSaveLessonSuccess () {
                vm.isSaving = false;
                vm.saveQuestion(0);
            }

            function onSaveLessonError () {
                vm.isSaving = false;

            }

            function onSaveQuestionSuccess(){
                vm.isSaving = false;
                vm.compteurQuestionSaved ++;
                if(vm.compteurQuestionSaved != vm.quizz.length){
                    vm.saveQuestion(vm.compteurQuestionSaved);
                }
                else{
                    vm.saveResponse(0, 0);
                }
            }

            function onSaveQuestionError(){
                vm.isSaving = false;

            }

            // Recherche la liste des blocs dans la BdD

            function loadAll () {

                Bloc.query({},onSuccess,onError)
            }

            function onSuccess(data){
                vm.blocs=data;
                //console.log(data);
            }

            function onError(error){

                AlertService.error(error.data.message);
            }

            loadAll();
            loadAllLessons();

            function loadAllLessons () {

                Lesson.query({},onSuccessLoadAllLessons, onErrorLoadAllLessons)
            }

            function onSuccessLoadAllLessons(data){
                vm.lessons=data;
                console.log('LESSONS : ');
                console.log(data);
            }

            function onErrorLoadAllLessons(error){

                AlertService.error(error.data.message);
            }

            this.numberLessonForNewLesson = function(idOfBloc){
                var num_lesson = 1;
                for(var i = 0; i<vm.lessons.length; i++){
                    if(idOfBloc === vm.lessons[i].bloc.id){
                        if(num_lesson <= vm.lessons[i].num_lesson){
                            num_lesson = vm.lessons[i].num_lesson + 1;
                        }
                    }
                }

                return num_lesson;
            }


            // Recherche le numéro de la leçon qui le précède
            /*
            function loadNumberLesson (id) {
                Lesson2.get({}, onSuccessLoadNumberLesson, onErrorLoadNumberLesson);
                //Lesson.query({},onSuccess,onError)
            }

            function onSuccessLoadNumberLesson(data){
                vm.lesson = data;
                console.log("data : ");
                console.log(data);
            }

            function onErrorLoadNumberLesson(error){
                console.log("Error");
                AlertService.error(error.data.message);
            }
            */
        }]);

})();
