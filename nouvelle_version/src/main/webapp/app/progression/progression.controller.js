(function() {
    'use strict';

    angular
        .module('objectifDtyApp')
        .controller('progressionController', progressionController);

    progressionController.$inject = ['Student','$scope', 'Principal', 'LoginService','Lesson_done', '$state'];

    function progressionController (Student,$scope, Principal, LoginService, Lesson_done, $state) {

        var vm=this;
        var Blocs=[];

        Principal.getStudent().then(function (data) {
            vm.student=data;
            vm.user=data.user;

            Lesson_done.query({},function(lessons){
                Bloc_done(lessons);
            });
    });
        /**

        fonction bloc_done : parcoure les lessons réalisées par le student - et crée le tableau Blocs
         qui continent des elements de la forme { bloc : bloc, lesson_dones : array contenant les id des lesson dones.
         Regroupe les leçons par bloc.
*/

        function Bloc_done(lessons) {
            console.log(lessons);

            for(var i=0;i<lessons.length;i++){

                var bloc=lessons[i].lessons[0].bloc;
                console.log(lessons[i].lessons[0].bloc);
                var lesson_done=lessons[i].lessons[0].id;

                IsBlocInBlocs(bloc.id,Blocs,function(isIn){
                    console.log(isIn);
                    if (!(isIn.res)) {
                        var res = {
                            bloc: bloc,
                            lesson_done: [lesson_done]
                        };
                        Blocs.push(res);
                    } else {
                        Blocs[isIn.num].lesson_done.push(lesson_done);
                    }
                    console.log(Blocs);
                    vm.blocs = Blocs;
                });

        }
        }

        function IsBlocInBlocs(Id,Array,callback) {
            var res = false;
            var num = -1;
            var done = false;
            if (Array.length === 0) {
                callback({res: res, num: num})
            } else {
                for (var i = 0; i < Array.length; i++) {
                    if (Blocs[i].bloc.id === Id) {
                        res = true;
                        num = i;
                    }
                    console.log("Blocs:", Blocs);
                    console.log('Id ', Id);
                    done = (i === Array.length - 1);

                    if (done) {
                        console.log(res, num);
                        console.log("done putain");
                        var result = {res: res, num: num};
                        callback(result);
                    }
                }
            }
        }

        function call(text) {
            console.log(text)
        }


    }
})();
