(function() {
    'use strict';

    angular
        .module('objectifDtyApp')
        .controller('progressionController', progressionController)


    progressionController.$inject = ['Student','$scope', 'Principal', 'LoginService','$state','Lesson_doneWid'];

    function progressionController (Student,$scope, Principal, LoginService,$state,Lesson_doneWid) {

        var vm=this;
        var Blocs=[];

        vm.floor=floor;
        vm.isDisabled=isDisabled;
        vm.goToLesson=goToLesson;
        vm.current=null;
        vm.setCurrent=setCurrent;
        vm.isCurrent=isCurrent;

        Principal.getStudent().then(function (data) {
            vm.student=data;
            vm.user=data.user;

            Lesson_doneWid.get({},function(lessons){
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

                IsBlocInBlocs(bloc.id,Blocs,function(isIn){
                    if (!(isIn.res)) {
                        var res = {
                            bloc: bloc,
                            lesson_done: [lesson_done]
                        };
                        Blocs.push(res);
                    } else {

                        Blocs[isIn.num].lesson_done.push(lesson_done);
                    }
                    vm.blocs = tri(Blocs);
                });

        }
        }

        //regarde si un bloc du même identifiant existe deja dans le tableau de blocs.

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

        //partie entière

        function floor(value){
            return Math.floor(value);
        }
        function isDisabled(lessonId,lesson_done) {

            return lesson_done.indexOf(lessonId)===-1;

        }
        // changement de page


        function goToLesson(id,bool){
            if(bool===false){
                console.log(id)
               $state.go('viewCourse',{id:id});
            }else{
            }

        }

        //function de tri, entrée : le bloc, sortie : le bloc avec le tableau lecons triées par numéro.
        function tri(Array) {
            var done = false
            for (var i = 0; i < Array.length; i++) {
                Array[i].bloc.lessons.sort(function (a, b) {
                    return (a.num_lesson - b.num_lesson)
                });
                if (i === Array.length - 1) {
                    done = true
                }
                if(done){return Array}
            }
        }

        //value : bloc

        function isCurrent(value){
            return vm.current.bloc.id===value.bloc.id;
        }

        function setCurrent(value){
            vm.current=value;
            console.log(value)
        }



    }
})();
