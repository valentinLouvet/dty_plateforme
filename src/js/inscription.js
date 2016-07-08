(function () {
    var app = angular.module('dty_plateform', ["chart.js", "ngCookies", "ngRoute"]).run(function ($rootScope, $cookies) {
        $rootScope.authenticated = $cookies.getObject('authenticated');
        console.log($rootScope.authenticated);
        $rootScope.loggedAs = $cookies.get('userType');
    }); // chart.js included to use angular-charts
    

    app.controller('viewController', ["$scope", "$cookies", "$location","$window", function ($scope, $cookies, $location,$window) {
        this.tab=1;

        this.isSelected = function (checkTab) {
            return this.tab === checkTab
        };

        this.selectTab = function (setTab) {
            this.tab = setTab;
        };
        $scope.userType = '';
        $scope.login = function () {
            $cookies.putObject('authenticated', true);
            $cookies.put('userType', $scope.userType);
            console.log('logged in');

            console.log($window.location.href);
            $window.location.href="/";
        };
        $scope.logout = function () {
            $cookies.remove('authenticated', false);
            $cookies.remove('userType', '');
            console.log('logged out');
            $window.location.href="/";
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
            controller: function () {
                panelselected = "";
            },
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

    app.controller('CourseController', function () {
        this.courses = courses;

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
            image: "../../images/nodejs2.png",
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
            link: '/cours'
        }
    ];
    
    app.controller('BadgeController', function(){
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

    app.config(['ChartJsProvider', function (ChartJsProvider) {
        // Configure all charts
        ChartJsProvider.setOptions({
            colours: ['#FF5252', '#FF8A80'],
            responsive: false
        });
        // Configure all line charts
        ChartJsProvider.setOptions('Line', {
            datasetFill: false
        });
    }]);

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


})();