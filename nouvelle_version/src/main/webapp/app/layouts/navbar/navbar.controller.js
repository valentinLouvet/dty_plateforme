(function() {
    'use strict';

    angular
        .module('objectifDtyApp')
        .controller('NavbarController', NavbarController);

    NavbarController.$inject = ['Student','$state', 'Auth', 'Principal', 'ProfileService', 'LoginService'];

    function NavbarController (Student,$state, Auth, Principal, ProfileService, LoginService) {
        var vm = this;

        vm.isNavbarCollapsed = true;
        vm.isAuthenticated = Principal.isAuthenticated;

        ProfileService.getProfileInfo().then(function(response) {
            vm.inProduction = response.inProduction;
            vm.swaggerDisabled = response.swaggerDisabled;
        });

        vm.login = login;
        vm.logout = logout;
        vm.toggleNavbar = toggleNavbar;
        vm.collapseNavbar = collapseNavbar;
        vm.$state = $state;

        function login() {
            collapseNavbar();
            LoginService.open();
        }

        function logout() {
            collapseNavbar();
            Auth.logout();
            $state.go('home');
        }

        function toggleNavbar() {
            vm.isNavbarCollapsed = !vm.isNavbarCollapsed;
        }

        function collapseNavbar() {
            vm.isNavbarCollapsed = true;
        }

        //pour chopper la todo_lesson du student - a modifier, on mettra toutes les infos user/student dans un cookie une fois pour toutes.
       var student=Student.query().$promise;
        vm.student=[];
        student.then(function(data){
            vm.student=data[0];
            console.log(vm.student)
        });

    }
})();
