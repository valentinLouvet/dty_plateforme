(function() {
    angular
        .module('objectifDtyApp')
        .factory('Statistics', Stats);
Stats.$inject=['$q','Lesson_doneWid','AllStudent'];

    function Stats($q,Lesson_doneWid,AllStudent) {

        var _students;
        return {
            'getStudents': getStudents,
            //'Assiduity':Assiduity,
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

        function assiduity(id) {
            Lesson_doneWid.get(id).$promise.then(function(data) {
                var Dates=[];
                var done=false;
                for(var i=0;i<data.length;i++){
                    Dates.push(data[i].date.getTime());
                    if(i===data.length-1){done=true}
                }
            });
        }
    }
})();
