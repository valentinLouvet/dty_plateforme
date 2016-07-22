(function () {
    'use strict';

    angular
        .module('objectifDtyApp')
        .controller('courseEditionController',['$state', '$cookies','Bloc','AlertService',function ($state, $cookies,Bloc,AlertService) {
            var vm=this;
            vm.compteur=1;
            vm.blocs=blocs;
            vm.blocs2=[];

            function loadAll () {
                Bloc.query({},onSuccess,onError)
            }

            function onSuccess(data){
                vm.blocs2=data;
                console.log(data)
            }

            function onError(error){
                AlertService.error(error.data.message)
            }


            loadAll();



            this.addCompteur= function(i){
                this.compteur = this.compteur + i
            };

            this.setCompteur = function (i) {
                this.compteur = i
            };


            this.goCourse = function (data) {
                $cookies.putObject('course', data);
                console.log($cookies.getObject('course'));
                $state.go('editCourse/modify')
            }

        }] );





    var blocs = [
        {
            name: 'HTML',
            courses: [
                {
                    name: 'Lesson 1 HTML',
                    id: 1,
                    content: 'HTML 1'
                },
                {
                    name: 'Lesson 2 HTML'
                },
                {
                    name: 'Lesson 3 HTML'
                }
            ]
        },
        {
            name: 'CSS',
            courses: [
                {
                    name: 'Lesson 1 CSS'
                },
                {
                    name: 'Lesson 2 CSS'
                },
                {
                    name: 'Lesson 3 CSS'
                },
                {
                    name: 'Lesson 4 CSS'
                }
            ]
        },
        {
            name: 'Angular',
            courses: [
                {
                    name: 'Lesson 1 Angular'
                },
                {
                    name: 'Lesson 2 Angular'
                }
            ]
        }
    ]


})();

