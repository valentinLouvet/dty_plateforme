(function () {
    var app = angular.module('dty_plateform', ['ui.router', 'chart.js', 'ngCookies']);


    app.run(function ($rootScope, $cookies) {
        $rootScope.authenticated = $cookies.getObject('authenticated');
        console.log($rootScope.authenticated);
        $rootScope.loggedAs = $cookies.get('userType');
        $rootScope.currentCourse = -1;
    }); // chart.js included to use angular-charts

    app.config(['ChartJsProvider', '$stateProvider', '$urlRouterProvider', function (ChartJsProvider, $stateProvider, $urlRouterProvider) {
        // Configure all charts
        ChartJsProvider.setOptions({
            colours: ['#FF5252', '#FF8A80'],
            responsive: false
        });
        // Configure all line charts
        ChartJsProvider.setOptions('Line', {
            datasetFill: false
        });

        //Configuration du stateProvider et urlProvider
        $urlRouterProvider.otherwise("/");

        $stateProvider
            .state("signup", {
                url: "/signup",
                templateUrl: "src/html/signup.html"
            })

            .state("login", {
                url: "/login",
                templateUrl: "src/html/login.html",
                controller:"loginController"
            })

            .state("home", {
                url: "/",
                templateUrl: "src/html/home.html"
            })

            .state("cours", {
                url: "/cours",
                templateUrl: "src/html/Cours/coursGit.html"
            })

            .state("coachStats", {
                url: "/coachStats",
                templateUrl: "src/html/coachProfile/Statistics.html"
            })

            .state("coachStudents", {
                url: "/coachProfile",
                templateUrl: "src/html/coachProfile/studentsListe.html"
            })

            .state("userCourses", {
                url: "/userCourses",
                templateUrl: "src/html/userProfile/userCourses.html"
            })

            .state("intro", {
                url:'/intro',
                templateUrl: 'src/html/Cours/intro.html'
            })
    }]);

    app.controller('viewController', ["$scope", "$cookies", "$location","$window", function ($scope, $cookies, $location,$window) {
    }]);

    app.controller('loginController', ["$state", "$scope", "$cookies", "$location", "$window", '$rootScope', function ($state, $scope, $cookies, $location, $window, $rootScope){
        $scope.userType = '';

        $scope.login = function() {
            $cookies.putObject('authenticated', true);
            $rootScope.authenticated=true;
            $cookies.put('userType', $scope.userType);
            $rootScope.loggedAs=$cookies.get('userType');
            console.log('logged in');

            console.log($cookies.getObject($rootScope.authenticated));
            console.log($cookies.get($rootScope.loggedAs));

            if ($scope.userType=="student"){
                $state.go('cours');
            }
            else if ($scope.userType=="coach"){
                $state.go('coachStudents')
            }
        };

        $scope.logout = function () {
            $cookies.remove('authenticated');
            $cookies.remove('userType');
            console.log('logged out');
            $window.location.href = "/";
            $rootScope.authenticated = '';
        };

    }]);

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
            controller: 'viewController',
            controllerAs: 'headerCtrl'
        }
    });
    app.directive('navBarSide', function () {
        return {
            restrict: 'E',
            templateUrl: '/html/templates/nav-bar-side.html',
            controller: 'viewController',
            controllerAs: 'headerCtrl'
        }
    });

    app.directive('dtyFooter', function () {
        return {
            restrict: 'E',
            templateUrl: '/html/templates/footer.html'
        }
    });


    ///////////////////////////
    // CONTROLLER FOR PROFILE//
    ///////////////////////////


    app.controller('CourseController', function ($rootScope) {

        this.courses = courses;
        this.allLessons = allLessons;
        this.currentLessons = currentLessons;
        var cont = this;
        this.setCurrentCourse = function (currentCourse, event) {
            var change = $rootScope.currentCourse === currentCourse;
            $rootScope.currentCourse = currentCourse;
            scrollTo("#courseLessons", event, !change);
            // cont.currentLessons = cont.allLessons[currentCourse].lessons;
            // cont.lessonList =(cont.allLessons[currentCourse].lessons).slice();
            replaceByValue((cont.allLessons[currentCourse]).lessons,cont.currentLessons);
            // cont.currentLessons.push('thing');
            

        }

    });

    // variables for tests only (displaying the courses)

    var courses = [
        // TODO : Create thumbnails !!!
        // TODO : delete useless images
        {
            name: "AngularJS",
            level: 10,
            description: "Front-End Javascript",
            coursesToDo: 5,
            image: '../../images/angularjs2.png',
            link: '#'
        },
        {
            name: "NodeJS",
            level: 38,
            description: "Back-End Javascript",
            coursesToDo: 8,
            image: "../../images/nodejs4.png",
            link: '#'
        },
        {
            name: "Python",
            level: 0,
            description: "Already learned in prepa !",
            coursesToDo: 2,
            image: "../../images/python2.png",
            link: '#'
        },
        {
            name: "HTML 5",
            level: 56,
            description: "Website Skeleton",
            coursesToDo: 0,
            image: "../../images/html5_2.png",
            link: '#'
        },
        {
            name: "Android",
            level: 32,
            description: "Smartphone Applications",
            coursesToDo: 5,
            image: "../../images/android-studio2.png",
            link: '#'
        },
        {
            name: "Git",
            level: 67,
            description: "Versioning",
            coursesToDo: 1,
            image: "../../images/git2.png",
            link: 'cours'
        }
    ];

    var allLessons = [
        {
            blockName: "AngularJS",
            lessons: [
                {
                    number: 1,
                    name: "Angular 1"
                },
                {
                    number: 2,
                    name: "Angular 2"
                }
            ]
        },
        {
            blockName: "NodesJS",
            lessons: [
                {
                    number: 1,
                    name: "Node 1"
                },
                {
                    number: 2,
                    name: "Node 2"
                }
            ]
        }
    ];

    var currentLessons =
        [
            {
                number: 1,
                name: "default 1"
            },
            {
                number: 2,
                name: "default 2"
            }
        ];


    app.controller('BadgeController', function () {
        this.badges = badges;
    });

    var badges = [
        // TODO : Mettre d'autres images à la place
        {
            name: "AngularJS",
            description: "You succesfully finished the course on AngularJS",
            image: '../../images/angularjs.jpg',
            link: '#'
        },
        {
            name: "NodeJS",
            description: "NodeJS has no secret for you anymore !",
            image: "../../images/nodejs.png",
            link: '#'
        },
        {
            name: "Python",
            description: "You're a god in Python !",
            image: "../../images/python.png",
            link: '#'
        },
        {
            name: "HTML 5",
            description: "You know HTML5 so perfectly !",
            image: "../../images/html5.png",
            link: '#'
        },
        {
            name: "Android",
            description: "",
            image: "../../images/android-studio.png",
            link: '#'
        },
        {
            name: "Git",
            description: "Teamwork is know a REAL quality you can put on your CV",
            image: "../../images/git.png",
            link: '#'
        }
    ];

    ////////////////////
    // DISPLAY GRAPHS //
    ////////////////////

    app.controller("LineCtrl", ['$scope', '$timeout', function ($scope, $timeout) {

        $scope.labels = ["January", "February", "March", "April", "May", "June", "July"];
        $scope.series = ['Series A', 'Series B'];
        $scope.data = [
            [65, 59, 80, 81, 56, 55, 40],
            [28, 48, 40, 19, 86, 27, 90]
        ];
        $scope.scale =
            $scope.onClick = function (points, evt) {
                console.log(points, evt);
            };

        // Simulate async data update
        $timeout(function () {
            $scope.data = [
                [28, 48, 40, 19, 86, 27, 90],
                [65, 59, 80, 81, 56, 55, 40]
            ];
        }, 3000);
    }]);


}());