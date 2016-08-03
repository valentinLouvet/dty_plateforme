(function () {
    'use strict';

    angular
        .module('objectifDtyApp')
        .controller('progressionController', progressionController)


    progressionController.$inject = ['Student', '$scope', 'Principal', 'LoginService', 'Lesson_done', 'Lesson_doneWid','$state'];

    function progressionController(Student, $scope, Principal, LoginService, Lesson_done, Lesson_doneWid, $state) {

        var vm = this;
        var Blocs = [];

        //vm.date_beginning_display = new Date(2016, 6);

        vm.floor=floor;
        vm.isDisabled=isDisabled;
        vm.goToLesson=goToLesson;
        vm.current=null;
        vm.setCurrent=setCurrent;
        vm.isCurrent=isCurrent;

        // Recherche toutes les dates des leçons réalisées par le user,
        // les place dans un tableau, incrémente lorsqu'une date apparaît
        // plus d'une fois, et place le résultat dans data

        function convertDateToTimeStamp(lessons){
            var timestamps = {};
            var dateAux = new Date();
            for(var i = 0; i<lessons.length; i++){
                dateAux = new Date(lessons[i].date);
                console.log(dateAux.getTime());
                if(timestamps[dateAux.getTime()/1000.0] != null){
                    timestamps[dateAux.getTime()/1000.0] ++;
                }
                else{
                    timestamps[dateAux.getTime()/1000.0] = 1;
                }
            }

            return(timestamps);

        }

        Principal.getStudent().then(function (data) {
            vm.student = data;
            vm.user = data.user;

            // Request to get the lessons
            Lesson_doneWid.query({},function(lessons){

                // data displayed on the heatmap calendar
                var d = convertDateToTimeStamp(lessons);

                // heatmap calendar
                // itemSelector important to bind the data
                var cal = new CalHeatMap();
                cal.init({itemSelector:"#cal-heatmap",
                 data: d,
                  start: new Date(2016, 6) ,
                   domain: 'month',
                    subDomain: 'day',
                     range: 12,
                      cellSize : 15,
                       domainMargin : [0, 1, 1, 1],
                        legend: [1, 2, 3, 4],
                         legendColors: {min:"#f5f5f5",
                                        max:"#87102c",
                                         empty:"white"}
                                                        });

                // Regroupe les leçons par bloc
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

            for (var i = 0; i < lessons.length; i++) {
                console.log("Blocs :", Blocs);

                var bloc = lessons[i].lessons[0].bloc;
                console.log("lesson_done:", lessons[i]);
                var lesson_done = lessons[i].lessons[0].id;

                IsBlocInBlocs(bloc.id, Blocs, function (isIn) {
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
                done = true
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

        function isDisabled(lessonId, lesson_done) {

            return lesson_done.indexOf(lessonId) === -1;

        }
        // changement de page


        function goToLesson(id, bool) {
            if (bool === false) {
                console.log(id);
                $state.go('viewCourse', {id: id});
            } else {
            }

        }

        //function de tri, entrée : le bloc, sortie : le bloc avec le tableau lecons triées par numéro.
        function tri(Array) {
            var done = false;
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
