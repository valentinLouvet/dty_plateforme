(function () {

    angular.module('objectifDtyApp').controller('ChooseCourseController', ChooseCourseController);

    ChooseCourseController.$inject = ['$timeout', '$scope', '$stateParams', '$uibModalInstance', 'Bloc', 'Lesson', 'Lesson_done', 'Student'];

    function ChooseCourseController($timeout, $scope, $stateParams, $uibModalInstance, Bloc, Lesson, Lesson_done, Student) {
        var vm = this;
        vm.clear = clear;
        vm.blocs_done = [];
        vm.blocs = [];
        console.log(vm);
        Lesson_done.query().$promise.then(function (data) {
            vm.lesson_dones = data;
            Bloc_done(data);
            console.log(vm.blocs_done.length);
            SonsOfBlocsDone(vm.blocs_done)
        });

        Student.query().$promise.then(function (data) {
            vm.student = data;
            console.log('Student : ', vm.student);

        });
        function clear() {
            $uibModalInstance.dismiss('cancel');

        }


        vm.setNextBloc = function (bloc) {
            for (var i = 0; i < bloc.lessons.length; i++) {
                if (bloc.lessons[i].num_lesson == 1) {
                    vm.student[0].todo_lesson = bloc.lessons[i];
                    saveStudent()

                }
            }
            clear()
        };

        function Bloc_done(lessons) {
            console.log(lessons);

            for (var i = 0; i < lessons.length; i++) {
                console.log("Blocs :", vm.blocs_done);

                var bloc = lessons[i].lessons[0].bloc;
                console.log("lesson_done:", lessons[i]);
                var lesson_done = lessons[i].lessons[0].id;

                IsBlocInBlocs(bloc.id, vm.blocs_done, function (isIn) {
                    if (!(isIn.res)) {

                        vm.blocs_done.push(bloc);
                    }
                });

            }
        }

        function IsBlocInBlocs(Id, Array, callback) {
            var res = false;
            var num = -1;
            var done = false;
            if (Array.length === 0) {
                done = true
            } else {
                for (var i = 0; i < Array.length; i++) {
                    if (vm.blocs_done[i].id === Id) {
                        res = true;
                        num = i;
                    }
                    done = (i === Array.length - 1);


                }

            }
            if (done) {
                console.log(res, num);
                var result = {res: res, num: num};
                callback(result);
            }
        }

        function SonsOfBlocsDone(Blocs_dones) {
            console.log("debut de SonsOfBlocsDone:", Blocs_dones.length);
            for (var i = 0; i < Blocs_dones.length; i++) {
                console.log("i =", i);
                console.log(Blocs_dones[i].is_father_offs);
                for (var j = 0; j < Blocs_dones[i].is_father_offs.length; j++) {
                    IsBlocInBlocs(Blocs_dones[i].is_father_offs[j].id, Blocs_dones, function (isIn) {
                        if (!(isIn.res)) {
                            if (Blocs_dones[i].is_father_offs[j].lessons[0]) {
                                vm.blocs.push(Blocs_dones[i].is_father_offs[j]);

                            }
                            else {
                                for (var k = 0; k < Blocs_dones[i].is_father_offs[j].is_father_offs.length; k++) {
                                    IsBlocInBlocs(Blocs_dones[i].is_father_offs[j].is_father_offs[k].id, Blocs_dones, function (isIn) {
                                        if (!(isIn.res)) {
                                            vm.blocs.push(Blocs_dones[i].is_father_offs[j].is_father_offs[k]);
                                        }
                                    });
                                }
                            }

                        }
                    });


                }
            }
        }

        function saveStudent() {
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

        function onSaveError() {
            vm.isSaving = false;
        }


    }
}());
