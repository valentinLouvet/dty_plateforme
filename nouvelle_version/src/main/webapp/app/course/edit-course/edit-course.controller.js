(function () {

    angular
        .module('objectifDtyApp')
        .controller('courseEditionController', courseEditionController);

    function courseEditionController() {
        this.blocs=blocs;

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
            courses: ['Lesson 1 CSS', 'Lesson 2 CSS', 'Lesson 3 CSS', 'Lesson 4 CSS']
        },
        {
            name: 'Angular',
            courses: ['Lesson 1 Angular']
        }
    ]


})();

