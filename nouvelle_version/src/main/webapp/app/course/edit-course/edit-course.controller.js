(function () {
    'use strict';

    angular
        .module('objectifDtyApp')
        .controller('courseEditionController',['$state', '$cookies','Bloc','AlertService',function ($state, $cookies,Bloc,AlertService) {
            var vm=this;
            vm.compteur=1;
            vm.blocs=[];
            vm.blocs_test= tests;


            function loadAll () {
                Bloc.query({},onSuccess,onError)
            }

            function onSuccess(data){
                vm.blocs=data;
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

            this.goCourse = function (course) {
                $cookies.putObject('course', course);
                console.log($cookies.getObject('course'));
                $state.go('editCourse/modify')
            }

        }] );





    var tests = [
        {
            name: 'HTML',
            lessons: [
                {
                    title: 'Lesson 1 HTML',
                    content: 'HTML 1',
                    questions: [
                        {
                            intitulate: 'Quelle est la couleur du cheval blanc ?',
                            responses: [
                                {
                                    text: 'Blanc',
                                },
                                {
                                    text: 'Vert'
                                },
                                {
                                    text: 'Jaune'
                                }
                            ]
                        },
                        {
                            intitulate: 'Quelle est la différence entre un pigeon ?',
                            responses:[
                                {
                                    text: 'Il a deux pattes pareilles, mais surtout la droite'
                                },
                                {
                                    text: 'il ne sait ni voler'
                                }
                            ]
                        }]
                },
                {
                    title: 'Lesson 2 HTML',
                    content: 'HTML 2'
                },
                {
                    title: 'Lesson 3 HTML',
                    content: 'HTML 3'
                }
            ]
        },
        {
            name: 'CSS',
            lessons: [
                {
                    title: 'Lesson 1 CSS'
                },
                {
                    title: 'Lesson 2 CSS'
                },
                {
                    title: 'Lesson 3 CSS'
                },
                {
                    title: 'Lesson 4 CSS'
                }
            ]
        },
        {
            name: 'Angular',
            lessons: [
                {
                    title: 'Lesson 1 Angular'
                },
                {
                    title: 'Lesson 2 Angular'
                }
            ]
        }
    ]


})();

