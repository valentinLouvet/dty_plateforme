(function () {

    angular.module('objectifDtyApp').controller('CourseViewController', ViewCourseController);

    ViewCourseController.$inject = ['Principal', 'courseView', '$scope', '$rootScope', '$stateParams', 'DataUtils', 'Lesson', 'Coach', 'Bloc', 'Question', 'Lesson_done', 'Student'];

    function ViewCourseController(Principal, courseView, $scope, $rootScope, $stateParams, DataUtils, Lesson, Coach, Bloc, Question, Lesson_done, Student) {
        var vm = this;
        vm.id = $stateParams.id;
        vm.lesson = Lesson.get({id: vm.id});
        vm.scoreCalc = false;
        vm.lessonDoneNew = true;
        vm.noteStars = 1;

        vm.score = null;
        Student.query().$promise.then(function (data) {
            vm.student = data;

        });
        Lesson_done.query().$promise.then(function (data) {
            vm.lesson_dones = data;
            for (i = 0; i < vm.lesson_dones.length; i++) {
                if (vm.lesson_dones[i].lessons[0].id == vm.lesson.id) {
                    vm.lessonDoneNew = false;
                    vm.lessonDoneI = i;
                }
            }
        });

        vm.SetNextLessonToDo = function(){
            for(i = 0; i<vm.lesson.bloc.lessons.length; i++){
                if(vm.lesson.bloc.lessons[i].num_lesson = vm.lesson.num_lesson + 1){

                    vm.student[0].todo_lesson = vm.lesson.bloc.lessons[i];
                }
            }
            console.log(vm.student[0].id);
        };

        vm.submitLesson = function () {
            vm.score = 0;
            for (i = 0; i < vm.lesson.questions.length; i++) {
                if (vm.lesson.questions[i].score == "true") {
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
            for (i = 0; i < vm.lesson_dones.length; i++) {
                if (vm.lesson_dones[i].lessons[0].id == vm.lesson.id) {
                    vm.lesson_done.id = vm.lesson_dones[i].id;
                    vm.lesson_done.note_init = vm.lesson_dones[i].note_init;
                    if (vm.lesson_dones[i].date) {
                        vm.lesson_done.date = vm.lesson_dones[i].date;
                    }
                    if (vm.score < vm.lesson_dones[i].note_max) {

                        vm.lesson_done.note_max = vm.lesson_dones[i].note_max;
                    }
                    vm.lessonDoneNew = false;
                }
            }

            switch (Math.floor(vm.score / 20)) {
                case 0 :
                    vm.noteStars = 1;
                    break;
                case 1 :
                    vm.noteStars = 2;
                    break;
                case 2 :
                    vm.noteStars = 3;
                    break;
                case 3 :
                    vm.noteStars = 4;
                    break;
                case 4 :
                    vm.noteStars = 5;
                    break;
                case 5 :
                    vm.noteStars = 5;
                    break;
            }

            document.getElementById("ImgScore").src = "../../../content/images/" + vm.noteStars + "-stars.jpg";
            vm.scoreCalc = true;
            saveLesson_done();

        };


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
            if(vm.lessonDoneNew){
                vm.SetNextLessonToDo();
                saveStudent();
            }



        }

        function onSaveError() {
            vm.isSaving = false;
        }

        function saveStudent () {
            vm.isSaving = true;
            if (vm.student.id !== null) {
                Student.update(vm.student[0], onSaveStudentSuccess, onSaveError);
            } else {
                Student.save(vm.student[0], onSaveStudentSuccess, onSaveError);
            }
        }

        function onSaveStudentSuccess (result) {
            $scope.$emit('objectifDtyApp:studentUpdate', result);
            vm.isSaving = false;
            console.log(vm.student[0].id);
        }



    }
}());

//bcp de dépendances inutilisées mais qui pourront toutefois servir !
