(function () {
    'use strict';

    angular
        .module('objectifDtyApp')
        .controller('courseModifyController',['Principal', 'DataUtils', 'courseView', '$state', 'Lesson', 'Question', 'Response', 'AlertService', function (Principal, DataUtils, courseView, $state, Lesson, Question, Response, AlertService) {

            var vm=this;
            vm.modifyCourse= false;
            vm.questions = [];

            vm.course= courseView;

            vm.newContent=vm.course.cours;
            vm.nbreLesson = vm.course.questions.length;

            //savoir quelles leçons sont éditées
            vm.editedQuestions= [];

            //avoir les questions pour pouvoir les modifier quand même
            for (var i=0; i<vm.nbreLesson; i++){
                vm.editedQuestions[i] = false;
                vm.questions.push(Question.get({id : vm.course.questions[i].id}));
                console.log(vm.questions)
            }

            //active le champ de texte pour modifier la partie cours
            vm.changeCourse= function () {
                vm.modifyCourse = !vm.modifyCourse
            };

            //sauvegarde les changements de la partie texte
            vm.saveChanges = function () {
                vm.course.cours = vm.newContent;
                vm.modifyCourse=false;
            };

            //permet d'afficher la modif de question
            vm.editQuestion = function (i) {
                vm.editedQuestions[i] = !vm.editedQuestions[i];
                console.log(vm.editedQuestions)
            };

            //sauvegarde la réponse
            vm.saveAnswer = function (question, answer, text) {
                console.log(text);
                vm.course.questions[question].responses[answer].text = text;
                vm.editedQuestions[question] = false;
                console.log(vm.editedQuestions)
            };

            //modifie la question
            vm.saveQuestion = function (question, text) {
                vm.course.questions[question].intitule = text;
                vm.editedQuestions[question] = false;
            };

            //enregistre la lesson dans la BDD
            vm.saveCourse = function() {
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

            function onSaveLessonSuccess () {
                //$scope.$emit('objectifDtyApp:lessonUpdate', result);
                //$uibModalInstance.close(result);
                vm.isSaving = false;
                console.log("onSaveLessonSuccess");
                $state.go('editCourse')
            }

            function onSaveLessonError () {
                vm.isSaving = false;
                console.log("onSaveLessonError");
            }

            //modifier les questions
            vm.saveQuestion = function(question) {
                vm.isSaving = true;
                if (vm.course.id !== null) {
                    console.log(vm.course.id);
                    console.log("vm.course.id !== null");
                    Question.update(question, onSaveQuestionSuccess, onSaveQuestionError);

                } else {
                    console.log("vm.course.id == null");
                    Lesson.save(vm.course, onSaveLessonSuccess, onSaveLessonError);
                }
                console.log(vm.course);
            };
            function onSaveQuestionSuccess() {
                vm.isSaving=false;
                console.log("ok")
            }

            function onSaveQuestionError(){
                vm.isSaving = false;
                console.log("error")
            }


        }])
})();
