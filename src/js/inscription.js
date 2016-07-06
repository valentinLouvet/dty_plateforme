(function () {
    var app = angular.module('dty_plateform', []);

    app.controller('viewController',function () {
        this.tab=1;

        this.isSelected = function (checkTab) {
            return this.tab === checkTab
        };

        this.selectTab = function (setTab) {
            this.tab = setTab;
        }
    });

    app.directive('inscriptionForm', function () {
        return {
            restrict: 'E',
            templateUrl: '/html/templates/inscription.html',
            controller: function () {
                this.username = "";
                this.password = "";
                this.confirmpwd = "";
                this.email = "";
                this.checkpwd = function () {
                    if (this.password != "" && this.confirmpwd != "") {
                        return (this.password == this.confirmpwd)
                    }
                    else {
                        return false;
                    }
                };

                this.inscrire = function () {

                }
            },
            controllerAs: 'signUpCtrl'
        };
    });

    app.directive('connexionForm', function () {
        return {
            restrict: 'E',
            templateUrl: '/html/templates/connexion.html',
            controller: function () {
                this.username = "";
                this.password = "";
                this.email = "";
            },
            controllerAs: "logInCtrl"
        }
    });

    app.directive('dtyHeader', function () {
        return {
            restrict: 'E',
            templateUrl: '/html/templates/nav-bar.html',
            controller: function () {
                panelselected="";
            },
            controllerAs: 'headerCtrl'
        }
    });

    app.directive('dtyFooter', function () {
            return{
                restrict: 'E',
                templateUrl: '/html/templates/footer.html'
            }
    });
    
    
    ///////////////////////////
    // CONTROLLER FOR PROFILE//
    ///////////////////////////
    
    
    app.controller("ProfileController", function(){
        this.tab = 1;

        this.selectedTab = function(setTab){
            this.tab = setTab;
        };
        this.isSelected = function(checkTab){
            return this.tab === checkTab;
        };
    });

    app.controller('CourseController', function(){
        this.courses = courses;

    });
    
    // variables for tests only (displaying the courses)
    
    var courses = [
        //TODO : Créer des thumbnails !!!
        {
            name: "AngularJS",
            level: 10,
            description: "Front-End Javascript",
            coursesToDo: 5,
            image:'../../images/angularjs.png',
            link:'#'
        },
        {
            name: "NodeJS",
            level: 38,
            description: "Back-End Javascript",
            coursesToDo: 8,
            image:"../../images/nodejs.png",
            link:'#'
        },
        {
            name: "Python",
            level: 0,
            description: "Langage déjà vu en prépa !",
            coursesToDo: 2,
            image:"../../images/python.png",
            link:'#'
        },
        {
            name: "HTML 5",
            level: 56,
            description: "Website Skeleton",
            coursesToDo: 0,
            image:"../../images/html5.png",
            link:'#'
        },
        {
            name: "Android",
            level: 32,
            description: "Smartphone Applications",
            coursesToDo: 5,
            image:"../../images/android-studio.png",
            link:'#'
        },
        {
            name:"Git",
            level: 67,
            description: "Versioning",
            coursesToDo: 1,
            image:"../../images/git.png",
            link:'coursSuivi.html'
        }
    ];
    
    
})();