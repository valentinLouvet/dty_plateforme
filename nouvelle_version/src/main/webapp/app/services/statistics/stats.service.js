(function() {
    angular
        .module('objectifDtyApp')
        .factory('Statistics', Stats);
Stats.$inject=['$q','Lesson_doneWid','AllStudent'];

    function Stats($q,Lesson_doneWid,AllStudent) {

        var _students;
        return {
            'getStudents': getStudents,
            'Assiduity':Assiduity,
            'LessonDones':LessonDones
            //'lastLesson':LastLesson,
            //'ConnexionDate':ConnexionDate

        };


        function getStudents() {
            var deferred = $q.defer();

            if (angular.isDefined(_students)) {
                deferred.resolve(_students);
                return deferred.promise;
            }

            AllStudent.query().$promise
                .then(function (data) {
                    _students= data;
                    deferred.resolve(_students);
                });
            return deferred.promise
        }


        function LessonDones(id) {
            var deferred=$q.defer();

            Lesson_doneWid.get(id).$promise.then(function (data) {
                deferred.resolve(data);
            });

            return deferred.promise
        }

        function Assiduity(id){
            Lesson_doneWid.get(id).$promise.then(function(data) {

                buildDates(data.sort(function (a, b){
                    return (Date.parse(a.date)- Date.parse(b.date))
                })
                );
            })
    }

        function buildDates(dateArray) {
            console.log(dateArray);

            var untilToday=toDays(Date.now())-toDays(Date.parse(dateArray[0].date))+1;
            console.log(Date.now());
            console.log(Date.parse(dateArray[0].date));
            console.log(untilToday);

            var dates = [1];
            var done = false;
            var currentDate = Date.parse(dateArray[0].date);
            var joursOn = 1;
            var assidu = 0;



            for (var i = 1; i < dateArray.length; i++) {
                var date = Date.parse(dateArray[i].date);
                var diff = dayDiff(date, currentDate);
                console.log(diff);
                if (diff >= 1) {
                    currentDate = date;
                    for (var j = 0; j < diff-1; j++) {
                        dates.push(0);
                    }

                    dates.push(1);
                    joursOn++;

                }

                console.log(dates);

                if (i === dateArray.length - 1) {
                    done = true;
                }

            }
            if (done) {
                console.log("done");
                if (dates.length > 0) {
                    if(dates.length<untilToday){
                        for(var k=0;k<(untilToday-(dates.length-1));k++){
                            dates.push(0)
                        }
                    }

                    assidu = joursOn / dates.length;
                }
                console.log(done);
                console.log(dates);
                console.log(assidu);
                return assidu;
            }
        }

    function dayDiff(Date1,Date2){
        return toDays(Date1)-toDays(Date2);
    }

    function toDays(date){
        return Math.floor(date/(3600*1000*24))
    }
    }
})();
