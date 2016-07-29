(function() {
    'use strict';

    angular
        .module('objectifDtyApp')
        .controller('progressionController', progressionController)


    progressionController.$inject = ['Student','$scope', 'Principal', 'LoginService','Lesson_done','$state'];

    function progressionController (Student,$scope, Principal, LoginService, Lesson_done, $state) {

        var vm=this;
        var Blocs=[];

        vm.floor=floor;
        vm.BlocOn=null;
        vm.isDisabled=isDisabled;
        vm.goToLesson=goToLesson;

        Principal.getStudent().then(function (data) {
            vm.student=data;
            vm.user=data.user;

            Lesson_done.query({},function(lessons){
                Bloc_done(lessons);
            });
    });
        /**

        fonction bloc_done : parcourt les lessons réalisées par le student - et crée le tableau Blocs
         qui contient des elements de la forme { bloc : bloc, lesson_dones : array contenant les id des lesson dones.
         Regroupe les leçons par bloc.
*/

        function Bloc_done(lessons) {
            console.log(lessons);

            for(var i=0;i<lessons.length;i++){
                console.log("Blocs :",Blocs)

                var bloc=lessons[i].lessons[0].bloc;
                console.log("lesson_done:",lessons[i]);
                var lesson_done=lessons[i].lessons[0].id;
                var lesson_results_init=lessons[i].note_init;
                var lesson_results_max=lessons[i].note_max;

                IsBlocInBlocs(bloc.id,Blocs,function(isIn){
                    if (!(isIn.res)) {
                        var res = {
                            bloc: bloc,
                            lesson_done: [{ldId:lesson_done,ldRes:lesson_results_max}]
                        };
                        Blocs.push(res);
                    } else {
                        var Obj={ldId:lesson_done,ldRes:lesson_results_max};
                        Blocs[isIn.num].lesson_done.push(lesson_done);
                    }
                    vm.blocs = Blocs;
                });

        }
        }

        function IsBlocInBlocs(Id,Array,callback) {
            var res = false;
            var num = -1;
            var done = false;
            if (Array.length === 0) {
                done=true
            } else {
                for (var i = 0; i < Array.length; i++) {
                    if (Blocs[i].bloc.id === Id) {
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

        function floor(value){
            return Math.floor(value);
        }
        function isDisabled(lessonId,lesson_done) {

            var done=false;
            var res=true;
            for(var i=0;i<lesson_done.length;i++) {
                if (lesson_done[i].ldId === lessonId) {
                    res=false;
                }
                done=(i===lesson_done.length-1)
            }
                if(done){return res}

        };

        function goToLesson(id,bool){
            if(bool===false){
                console.log(id)
               $state.go('viewCourse',{id:id});
            }else{
            }

        }



    }
})();
