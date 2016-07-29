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

            vm.initialize = function () {
                vm.questions = [];
                vm.responses = [];
                vm.newIntitule = [];

                vm.course = courseView;

                vm.newContent = vm.course.cours;
                vm.nbreLesson = vm.course.questions.length;

                //avoir les questions pour pouvoir les modifier quand même et les réponses
                for (var i = 0; i < vm.nbreLesson; i++) {
                    vm.editedQuestions[i] = false;
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
            vm.registerQuestion = function () {
                var newQuestion = vm.questions[0];
                newQuestion.id = null;
                newQuestion.intitule = vm.newIntitule;
                console.log(newQuestion);
                Question.save(newQuestion, onSaveQuestionResponseSuccess, onSaveQuestionError);
            };

            function onSaveQuestionResponseSuccess(newQuestion) {
                var newQuestionAnswers = [];
                for (var i = 0; i < vm.newAnswers.length; i++) {
                    newQuestionAnswers.push(vm.responses[1][0]);
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
                            Response.delete({id: vm.responses[vm.questions.indexOf(question)][j].id}, onDeleteResponseQuestionSuccess, onDeleteResponseQuestionError)
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

            //enregistre la lesson dans la BDD
            vm.saveCourse = function () {
                vm.isSaving = true;
                if (vm.course.id !== null) {
                    console.log(vm.course.id);
                    console.log("vm.course.id !== null");
                    Lesson.update(vm.course, onSaveLessonSuccess, onSaveLessonError);

                } else {
                    console.log("vm.course.id == null");
                    Lesson.save(vm.course, onSaveLessonSuccess, onSaveLessonError);
                }
                console.log(vm.course);
            };

            function onSaveLessonSuccess() {
                //$scope.$emit('objectifDtyApp:lessonUpdate', result);
                //$uibModalInstance.close(result);
                vm.isSaving = false;
                console.log("onSaveLessonSuccess");
                $state.go('editCourse')
            }

            function onSaveLessonError() {
                vm.isSaving = false;
                console.log("onSaveLessonError");
            }

            //modifier les questions
            vm.saveQuestion = function (question) {
                vm.isSaving = true;
                if (vm.course.id !== null) {
                    console.log(question);
                    console.log("question !== null");
                    Question.update(question, onSaveQuestionSuccess, onSaveQuestionError);

                } else {
                    console.log("question == null");
                    Question.save(question, onSaveQuestionSuccess, onSaveQuestionError);
                }
                vm.editedQuestions[vm.questions.indexOf(question)] = false;
                console.log(question);
            };

            function onSaveQuestionSuccess() {
                vm.isSaving = false;
                console.log("ok question");
                $state.go($state.current, {}, {reload: true});
                vm.initialize()
            }

            function onSaveQuestionError() {
                vm.isSaving = false;
                console.log("error question")
            }

            //modifier les questions
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
