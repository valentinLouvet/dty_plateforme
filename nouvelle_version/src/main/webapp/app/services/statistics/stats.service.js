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
            'LessonDones':LessonDones,
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

                buildDates(data.sort(function (a, b) {
                    return (Date.parse(a.date)- Date.parse(b.date))
                })
                );
            })
    }

        function buildDates(dateArray) {
            var dates = [];
            var done = false;
            var currentDate = new Date(Date.parse(dateArray[0].date));
            var joursOn = 0;
            var index = 1;
            var assidu = 0;


            for (var i = 1; i < dateArray.length; i++) {
                var date =  new Date(Date.parse(dateArray[i].date));
                var diff = dayDiff(date, currentDate);
                console.log(diff);
                if (diff >= 1) {
                    currentDate = date;
                    for (var j = index; j < j + diff; j++)
                        dates[j] = 0;
                    dates[index + diff] = 1;
                    index = index + diff;
                    joursOn++;
                }

                if (i === dateArray.length - 1) {
                    done = true;
                }

            }
            if (done === true) {
                if (dates.length > 0) {
                    assidu = joursOn / dates.length;
                }
                console.log(dates);
                console.log(assidu);

                return assidu;
            }
        }

    function dayDiff(Date1,Date2){
        var Day1={day:Date1.getDate,month:Date1.getMonth,year:Date1.getFullYear};
        var Day2={day:Date2.getDate,month:Date2.getMonth,year:Date1.getFullYear};

        if(Day1.month===Day2.month){
            console.log(Day1.day-Day2.day)
                return Day1.day-Day2.day;
            }else{
                return Day2.day+daysInMonth(Day1.month,Day1.year)-Day1.days
            }

            function daysInMonth(month,year){
                return new Date(year,month,0).getDate();
            }
    }
    }
})();
