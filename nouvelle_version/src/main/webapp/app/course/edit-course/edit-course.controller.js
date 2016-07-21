(function () {

    angular
        .module('objectifDtyApp')
        .controller('courseEditionController', courseEditionController);

    function courseEditionController() {
        this.blocs=blocs;
        this.compteur=1;

        this.addCompteur= function(i){
            this.compteur = this.compteur + i
        };

        this.setCompteur = function (i) {
            this.compteur = i
        }

    }

    var blocs = [
        {
            name: 'HTML',
            courses: [
                {
                    name: 'Lesson 1 HTML'
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

