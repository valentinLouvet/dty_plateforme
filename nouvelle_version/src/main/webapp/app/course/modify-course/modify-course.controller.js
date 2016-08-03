(function () {
    'use strict';

    angular
        .module('objectifDtyApp')
        .controller('courseModifyController', ['Principal', 'DataUtils', 'courseView', '$state', 'Lesson', 'Question', 'Response', function (Principal, DataUtils, courseView, $state, Lesson, Question, Response) {

            var vm = this;
            vm.modifyCourse = false;
            vm.addingQuestion = false;

            //savoir quelles leçons sont éditées
            vm.editedQuestions = [];

            //cette fonction sert à initialsier la page en ayant les bonnes questions et les réponses
            //on l'appelle à la fin de chaque modification afin d'être sûrs que le back et le front soient cohérents
            //permet de ne pas recharger la page
            //on stocke les variables pour le nouvelle question et les nouvelles réponses temporairement avant de les assigner
            //cela permet de ne pas modifier la question ou la réponse qui sert de modèle
            vm.initialize = function () {
                vm.questions = [];
                vm.responses = [];
                vm.newIntitule = [];
                vm.addingAnswer = [];
                vm.newText = "";
                vm.newCorrection = "";
                vm.newVeracity = false;

                vm.course = courseView;

                vm.newContent = vm.course.cours;
                vm.nbreLesson = vm.course.questions.length;

                //avoir les questions pour pouvoir les modifier quand même et les réponses
                //pour éviter les boucles, on ne peut accéder à lesson.questions.lesson
                //il faut donc faire une requete pour obtenir les questions qui correspondent aux questions de la leçon afin de les modifier
                //il en va de même pour les réponses qui correspondent aux questions
                for (var i = 0; i < vm.nbreLesson; i++) {
                    vm.editedQuestions[i] = false;
                    vm.addingAnswer[i] = false;
                    vm.questions.push(Question.get({id: vm.course.questions[i].id}));
                    vm.responses[i] = new Array(0);
                    for (var j = 0; j < vm.course.questions[i].responses.length; j++) {
                        vm.responses[i].push(Response.get({id: vm.course.questions[i].responses[j].id}));
                    }
                }
                vm.newAnswers = [{text: ""}, {text: ""}];
            };

            vm.initialize();


            //active le champ de texte pour modifier la partie cours
            vm.changeCourse = function () {
                vm.modifyCourse = !vm.modifyCourse
            };

            //sauvegarde les changements de la partie texte
            vm.saveChanges = function () {
                vm.course.cours = vm.newContent;
                vm.modifyCourse = false;
            };

            //permet d'afficher la modif de question
            vm.editQuestion = function (i) {
                vm.editedQuestions[i] = !vm.editedQuestions[i];
            };

            //active le champ de création de question
            vm.addQuestion = function () {
                vm.addingQuestion = !vm.addingQuestion
            };

            //ajoute la question
            //les fonctions de callback permettent de s'assurer que les fonctions sont bien exécutées dans le bon ordre #asynchronisme
            //il faut s'assurer que la question est bien créée avant les réponses, sinon on ne peut affecter les réponses à la question, qui n'est pas dans la BDD
            //les trois premières lignes servent à créer un modèle de question vide, puis à lui affecter la bonne question et une id nulle pour pouvoir l'enregistrer
            vm.registerQuestion = function () {
                var newQuestion = vm.questions[0];
                newQuestion.id = null;
                newQuestion.intitule = vm.newIntitule;
                console.log(newQuestion);
                Question.save(newQuestion, onSaveQuestionResponseSuccess, onSaveQuestionError);
            };

            //fonction de callback qui sauvegarde les réponses associées à la question
            //les premières lignes servent à créer un modèle de réponse
            //on lui associe ensuite la bonne question puis une id nulle pour pouvoir l'enregistrer
            function onSaveQuestionResponseSuccess(newQuestion) {
                var newQuestionAnswers = [];
                for (var i = 0; i < vm.newAnswers.length; i++) {
                    newQuestionAnswers.push(vm.responses[0][0]);
                    newQuestionAnswers[i].text = vm.newAnswers[i].text;
                    newQuestionAnswers[i].question = newQuestion;
                    newQuestionAnswers[i].id = null;
                    console.log(newQuestionAnswers[i]);
                    Response.save(newQuestionAnswers[i], onSaveResponseSuccess, onSaveResponseError)
                }
                vm.isSaving = false;
                console.log("Nouvelle Question créée");
                $state.go($state.current, {}, {reload: true});
                vm.initialize()
            }


            //supprime la question
            //fonctionnel, mais à améliorer pour vaincre l'asynchronisme
            //le problème ne peut se régler comme avant avec une fonction de callback, car on ne va pas l'appeler à chaque boucle
            //à creuser : disjonction de cas, j'ai essayé mais cela ne fonctionne pas actuellement
            vm.deleteQuestion = function (question) {
                if (vm.questions.length > 1) {
                    console.log(vm.responses[vm.questions.indexOf(question)]);
                    if (vm.responses[vm.questions.indexOf(question)].length == 0) {
                        Question.delete({id: question.id}, onDeleteQuestionSuccess, onDeleteQuestionError);
                        vm.questions[vm.questions.indexOf(question)].intitule = null;
                        $state.go($state.current, {}, {reload: true});
                        vm.initialize()
                    } else {
                        for (var j = 0; j < vm.responses[vm.questions.indexOf(question)].length; j++) {
                            /*if (j != vm.responses[vm.questions.indexOf(question)].length){
                             Response.delete({id : vm.responses[vm.questions.indexOf(question)][j].id}, onDeleteResponseSuccess, onDeleteResponseError);
                             vm.responses[vm.questions.indexOf(question)][j].text = null;
                             } else {
                             console.log(vm.responses[vm.questions.indexOf(question)][j]);
                             Response.delete({id : vm.responses[vm.questions.indexOf(question)][j].id}, onDeleteResponseQuestionSuccess, onDeleteResponseQuestionError)
                             vm.responses[vm.questions.indexOf(question)][j].text = null;
                             }*/
                            Response.delete({id: vm.responses[vm.questions.indexOf(question)][j].id}, onDeleteResponseQuestionSuccess, onDeleteResponseQuestionError);
                            vm.responses[vm.questions.indexOf(question)][j].text = null;
                            Question.delete({id: question.id}, onDeleteQuestionSuccess, onDeleteQuestionError);
                        }
                        Question.delete({id: question.id}, onDeleteQuestionSuccess, onDeleteQuestionError);
                        vm.questions[vm.questions.indexOf(question)].intitule = null;
                    }
                }
            };

            function onDeleteResponseQuestionSuccess() {
                vm.isSaving = false;
                /*Question.delete({id : question.id}, onDeleteQuestionSuccess, onDeleteQuestionError);
                 //Question.delete({id : vm.questions[vm.questions.indexOf(question)].id}, onDeleteQuestionSuccess, onDeleteQuestionError);
                 vm.questions[vm.questions.indexOf(question)].intitule = null;
                 console.log("response deleted");
                 $state.go($state.current, {}, {reload: true});
                 vm.initialize()*/
                console.log('Question deleted')
            }

            function onDeleteResponseQuestionError() {
                vm.isSaving = false;
                console.log("Response not deleted")
            }

            function onDeleteQuestionSuccess() {
                vm.isSaving = false;
                console.log("Question deleted")
            }

            function onDeleteQuestionError() {
                vm.isSaving = false;
                console.log("Question not deleted")
            }

            //supprime la réponse
            vm.deleteResponse = function (question, response) {
                if (vm.responses[vm.questions.indexOf(question)].length > 2) {
                    vm.responses[vm.questions.indexOf(question)][vm.responses[vm.questions.indexOf(question)].indexOf(response)] = null;
                    Response.delete({id: response.id}, onDeleteResponseSuccess, onDeleteResponseError);
                }
                console.log(response)
            };

            function onDeleteResponseSuccess() {
                vm.isSaving = false;
                console.log("response deleted");
                $state.go($state.current, {}, {reload: true});
                vm.initialize()
            }

            function onDeleteResponseError() {
                vm.isSaving = false;
                console.log("Response not deleted")
            }

            //ajoute le champ pour rentrer une nouvelle réponse
            vm.addAnswer = function (question) {
                vm.addingAnswer[vm.questions.indexOf(question)] = !vm.addingAnswer[vm.questions.indexOf(question)]
            };

            vm.addResponse = function (question){
                var newResponse = vm.responses[vm.questions.indexOf(question)][0];
                newResponse.veracity = vm.newVeracity;
                newResponse.text = vm.newText;
                newResponse.correction = vm.newCorrection;
                newResponse.id = null;
                console.log(newResponse);
                Response.save(newResponse, onSaveNewResponseSuccess, onSaveNewResponseError)
            };

            function onSaveNewResponseSuccess() {
                vm.isSaving = false;
                console.log("Nouvelle réponse créée");
                $state.go($state.current, {}, {reload: true});
                vm.initialize()
            }

            function onSaveNewResponseError() {
                vm.isSaving = false;
                console.log("error response");
            }

            //enregistre la lesson dans la BDD
            vm.saveCourse = function () {
                vm.isSaving = true;
                if (vm.course.id !== null) {
                    console.log(vm.course);
                    Lesson.update(vm.course, onSaveLessonSuccess, onSaveLessonError);

                } else {
                    Lesson.save(vm.course, onSaveLessonSuccess, onSaveLessonError);
                }
                console.log(vm.course);
            };

            function onSaveLessonSuccess() {
                for (var i=0; i<vm.questions.length; i++){
                    console.log('truc');
                    vm.questions[i].id = null;
                    Question.save(vm.questions[i], onSaveGlobalQuestionSuccess(i), onSaveGlobalQuestionError)
                }
                vm.isSaving = false;
                console.log("onSaveLessonSuccess");
                //$state.go('editCourse')
            }

            function onSaveGlobalQuestionSuccess(i){
                for (var j=0; j<vm.responses[i].length; j++){
                    Response.update(vm.responses[i][j], onSaveResponseGlobalSuccess, onSaveResponseGlobalError)
                }
            }

            function onSaveResponseGlobalSuccess() {
                console.log(vm.course)
            }

            function onSaveResponseGlobalError() {
                console.log("Sauvegarde de la réponse globale échouée")
            }

            function onSaveGlobalQuestionError() {
                console.log('Erreur dans la sauvegarde globale de la question')
            }

            function onSaveLessonError() {
                vm.isSaving = false;
                console.log("onSaveLessonError");
            }

            //modifier les questions
            vm.saveQuestion = function (question) {
                vm.isSaving = true;
                if (vm.course.id !== null) {
                    vm.indexUpdate = vm.questions.indexOf(question);
                    console.log(vm.questions.indexOf(question));
                    Question.update(question, onSaveQuestionSuccess, onSaveQuestionError);

                } else {
                    console.log("question == null");
                    Question.save(question, onSaveQuestionSuccess, onSaveQuestionError);
                }
                vm.editedQuestions[vm.questions.indexOf(question)] = false;
                console.log(question);
            };

            function onSaveQuestionSuccess(question) {
                for (var i = 0; i<vm.responses[vm.indexUpdate].length; i++){
                    Response.update(vm.responses[vm.indexUpdate][i], onSaveResponseSuccess, onSaveResponseError)
                }
                vm.isSaving = false;
                console.log("ok question");
                $state.go($state.current, {}, {reload: true});
                vm.initialize()
            }

            function onSaveQuestionError() {
                vm.isSaving = false;
                console.log("error question")
            }

            //modifier les réponses
            vm.saveResponse = function (response) {
                vm.isSaving = true;
                if (response !== null) {
                    console.log(response);
                    console.log("response !== null");
                    Response.update(response, onSaveResponseSuccess, onSaveResponseError);

                } else {
                    console.log("question == null");
                    Response.save(response, onSaveResponseSuccess, onSaveResponseError);
                }
                console.log(response);
            };

            function onSaveResponseSuccess() {
                vm.isSaving = false;
                console.log("Nouvelle réponse créée")
            }

            function onSaveResponseError() {
                vm.isSaving = false;
                console.log("error response")
            }

        }])
})();
