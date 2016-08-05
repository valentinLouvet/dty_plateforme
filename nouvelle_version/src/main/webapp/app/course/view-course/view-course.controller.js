(function () {
    'use strict';

    angular.module('objectifDtyApp').controller('CourseViewController', ViewCourseController);

    ViewCourseController.$inject = ['Principal', 'courseView', '$scope', '$rootScope', '$stateParams', '$state', '$uibModal', 'DataUtils', 'Lesson', 'Coach', 'Bloc', 'Question', 'Lesson_done', 'Student', 'Badge','orderByFilter','$filter'];

    function ViewCourseController(Principal, courseView, $scope, $rootScope, $stateParams, $state, $uibModal, DataUtils, Lesson, Coach, Bloc, Question, Lesson_done, Student, Badge, orderBy,$filter) {
        var vm = this;
        vm.id = $stateParams.id;
        Lesson.get({id: vm.id}).$promise.then(function (data) {
            vm.lesson = data;
            console.log(vm.lesson);
            vm.isLast = (vm.lesson.bloc.lessons[vm.lesson.bloc.lessons.length - 1].id == vm.lesson.id);
            console.log(vm.isLast)
        });
        vm.scoreCalc = false;
        vm.lessonDoneNew = true;
        vm.noteStars = 1;
        vm.chooseNewBloc = false;
        vm.goCourse = goCourse;
        vm.nbLessonDoneToday = 0;
        vm.isLastLessonDone = false;
        vm.dateNow = new Date();



        vm.score = null;
        Student.query().$promise.then(function (data) {
            vm.student = data;


        });
        Lesson_done.query({page: vm.page, size: 10000}).$promise.then(function (data) {
            vm.lesson_dones = data;


            for (var i = 0; i < vm.lesson_dones.length; i++) {
                if (vm.lesson_dones[i].lessons[0].id == vm.lesson.id) {
                    vm.lessonDoneNew = false;
                    vm.lessonDoneI = i;
                    var temp = vm.lesson_dones[i];

                    if (temp.note_init == null) {
                        setImgScoreInit(" &#9888;  Cette leçon n'a pas de question, elle n'a donc pas de score ! &#9888");
                        setImgScoreMax("&#9888;  Cette leçon n'a pas de question, elle n'a donc pas de score !  &#9888;");
                    } else {
                        setImgScoreMax(convertScore(temp.note_max));
                        setImgScoreInit(convertScore(temp.note_init));
                    }
                }
                vm.dateLesson = new Date(vm.lesson_dones[i].date);
                if (vm.dateNow.getYear() == vm.dateLesson.getYear() && vm.dateNow.getMonth() == vm.dateLesson.getMonth() && vm.dateNow.getDate() == vm.dateLesson.getDate()) {
                    vm.nbLessonDoneToday++;
                }
            }
            console.log(vm.nbLessonDoneToday);
            if (vm.nbLessonDoneToday > 4 && vm.lessonDoneNew) {
                $state.go("tooMuchLesson")
            }
            console.log(vm.lesson_dones);
            vm.lesson_donesSorted = orderBy(vm.lesson_dones, 'id');
            console.log(vm.lesson_donesSorted);

            if(vm.isLast){
                vm.isLastLessonDone = (vm.lesson_donesSorted[vm.lesson_dones.length - 1].lessons[0].id == vm.lesson.id);
                console.log(vm.lesson_dones[vm.lesson_dones.length - 1].lessons[0]);
            }

        });

        vm.SetNextLessonToDo = function () {
            for (var i = 0; i < vm.lesson.bloc.lessons.length; i++) {
                if (vm.lesson.bloc.lessons[i].num_lesson == vm.lesson.num_lesson + 1) {
                    vm.student[0].todo_lesson = vm.lesson.bloc.lessons[i];
                }
            }
        };

        vm.submitLesson = function () {
            vm.score = 0;
            for (var i = 0; i < vm.lesson.questions.length; i++) {
                vm.lesson.questions[i].answerchoosen = angular.fromJson(vm.lesson.questions[i].score);
                if (angular.fromJson(vm.lesson.questions[i].score).veracity == true) {
                    vm.score++;
                }
            }
            vm.score *= 100;
            vm.score /= vm.lesson.questions.length;
            vm.score = parseInt(vm.score);

            vm.lesson_done = {
                note_init: vm.score,
                note_max: vm.score,
                student: vm.student[0],
                lessons: [vm.lesson],
                date: new Date()
            };
            for (var i = 0; i < vm.lesson_dones.length; i++) {
                if (vm.lesson_dones[i].lessons[0].id == vm.lesson.id) {
                    vm.lesson_done.id = vm.lesson_dones[i].id;
                    vm.lesson_done.note_init = vm.lesson_dones[i].note_init;
                    vm.lesson_done.date = vm.lesson_dones[i].date;
                    if (vm.score < vm.lesson_dones[i].note_max) {

                        vm.lesson_done.note_max = vm.lesson_dones[i].note_max;


                    }
                    vm.lessonDoneNew = false;
                }

            }


            vm.scoreCalc = true;
            if (vm.lesson_done.note_init == null) {
                setImgScoreInit(" &#9888;  Cette leçon n'a pas de question, elle n'a donc pas de score ! &#9888");
                setImgScoreMax("&#9888;  Cette leçon n'a pas de question, elle n'a donc pas de score !  &#9888;");
                setImgScoreDone("&#9888;  Cette leçon n'a pas de question, elle n'a donc pas de score !  &#9888;");
            } else {
                setImgScoreMax(convertScore(vm.lesson_done.note_max));
                setImgScoreInit(convertScore(vm.lesson_done.note_init));
                setImgScoreDone(convertScore(vm.score));
            }


            saveLesson_done();


            if (vm.isLast) {
                /* CHANGE BADGE LOGIC */
                var BlocName = vm.lesson.bloc.name;
                Badge.query().$promise.then(function (data) {
                    //console.log(data.length);

                    // Reach all the badges possible
                    for (var j = 0; j < data.length; j++) {

                        // for the badge relative to the current Bloc only
                        if (data[j].name == BlocName) {

                            console.log(vm.student[0]);
                            console.log(vm.student[0].owned_badges);

                            var temp3 = vm.student[0].owned_badges;
                            if (temp3 == null) {
                                temp3 = [];
                            }
                            ;
                            console.log(temp3);
                            var isOwned = temp3.some(function (val) {
                                console.log(val);
                                console.log(val.name);
                                return val.name.includes("HTML");
                            });
                            /*console.log(temp3[0].name);
                             console.log(temp3[0].name.includes(BlocName));
                             console.log(isOwned); */


                            temp3.push(data[j]);

                            vm.student[0].owned_badges = temp3;
                            console.log(vm.student[0]);
                            //saveStudent();


                        }
                    }
                });


                /* OPEN THE ANIMATION */
                var fen = $uibModal.open({
                    animation: true,
                    templateUrl: 'app/badge/1-badge.html',
                    controller: 'MyBadgeController',
                    controllerAs: 'vm',
                    size: 'md',
                    resolve: {
                        items: function () {
                            return {
                                title: vm.lesson.bloc.name,
                                path: vm.lesson.bloc.logo

                            };
                        },
                        BadgeView: ['$stateParams', 'Lesson', function ($stateParams, Lesson) {
                            return Lesson.get({id: vm.id}).$promise;
                        }]
                    }

                });


            }


        };

        /*
         /   Convertit le score en un string d'etoiles
         */

        function convertScore(score) {

            var Note = 0;

            switch (Math.floor((score) / 20)) {


                case 0 :
                    Note = 0;
                    break;
                case 1 :
                    Note = 1;
                    break;
                case 2 :
                    Note = 2;
                    break;
                case 3 :
                    Note = 3;
                    break;
                case 4 :
                    Note = 4;
                    break;
                case 5 :
                    Note = 5;
                    break;
            }
            var etoile = "";

            for (var i = 0; i < Note; i++) {
                etoile = etoile + "&#9733;";
            }
            for (var j = 0; j < 5 - Note; j++) {
                etoile = etoile + "&#9734;";
            }

            return etoile;


        }


        function setImgScoreMax(etoile) {
            var spanMax = document.getElementById("ImgScoreMax");
            spanMax.innerHTML = etoile;
        }

        function setImgScoreInit(etoile) {

            var spanInit = document.getElementById("ImgScoreInit");
            spanInit.innerHTML = etoile;
        }

        function setImgScoreDone(etoile) {
            var spanDone = document.getElementById("ImgScoreDone");
            spanDone.innerHTML = etoile;
        }


        function saveLesson_done() {
            vm.isSaving = true;
            if (vm.lesson_done.id !== null) {
                Lesson_done.update(vm.lesson_done, onSaveLessonSuccess, onSaveError);
            } else {
                Lesson_done.save(vm.lesson_done, onSaveLessonSuccess, onSaveError);
            }
        }

        function onSaveLessonSuccess(result) {
            $scope.$emit('objectifDtyApp:lesson_doneUpdate', result);
            vm.isSaving = false;
            Student.query().$promise.then(function (data) {
                vm.student = data;
            });
            if (vm.lessonDoneNew) {
                vm.SetNextLessonToDo();
                saveStudent();
            }

            if (vm.student[0].todo_lesson.id == vm.lesson.id) {
                vm.chooseNewBloc = true;
            }


        }

        function onSaveError() {
            vm.isSaving = false;
        }

        function saveStudent() {
            console.log("saveStudentCalled");
            vm.isSaving = true;
            if (vm.student.id !== null) {
                Student.update(vm.student[0], onSaveStudentSuccess, onSaveError);
            } else {
                Student.save(vm.student[0], onSaveStudentSuccess, onSaveError);
            }
        }

        function onSaveStudentSuccess(result) {
            $scope.$emit('objectifDtyApp:studentUpdate', result);
            vm.isSaving = false;
        }

        function goCourse() {
            Student.query().$promise.then(function (data) {
                vm.student = data;
                $state.go('viewCourse', {id: vm.student[0].todo_lesson.id});
            });


        }


    }
}());

//bcp de dépendances inutilisées mais qui pourront toutefois servir !
