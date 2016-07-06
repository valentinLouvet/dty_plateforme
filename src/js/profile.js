/**
 * Created by vincenthoulbreque on 05/07/2016.
 */


(function(){
    var profileApp = angular.module('profileApp', []);
    console.log('debug1');

    profileApp.controller('CourseController', function(){
        this.courses = courses;

    });

    var courses = [
        //TODO : Créer des thumbnails !!!
        {
            name: "AngularJS",
            level: 10,
            description: "Front-End Javascript",
            coursesToDo: 5,
            image:'../../images/angularjs.png'
        },
        {
            name: "NodeJS",
            level: 38,
            description: "Back-End Javascript",
            coursesToDo: 8,
            image:"../../images/nodejs.png"
        },
        {
            name: "Python",
            level: 0,
            description: "",
            coursesToDo: 2,
            image:"../../images/python.png"
        },
        {
            name: "HTML 5",
            level: 56,
            description: "Website Skeleton",
            coursesToDo: 0,
            image:"../../images/html5.png"
        },
        {
            name: "Android",
            level: 32,
            description: "Smartphone Applications",
            coursesToDo: 5,
            image:"../../images/android-studio.png"
        }
    ];

})();