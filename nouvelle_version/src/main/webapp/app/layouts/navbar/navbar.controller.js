(function () {
    'use strict';

    angular
        .module('objectifDtyApp')
        .controller('NavbarController', NavbarController);

    NavbarController.$inject = ['Student', '$state', 'Auth', 'Principal', 'ProfileService', 'LoginService'];

    function NavbarController(Student, $state, Auth, Principal, ProfileService, LoginService) {
        var vm = this;

        vm.isNavbarCollapsed = true;
        vm.isAuthenticated = Principal.isAuthenticated;

        ProfileService.getProfileInfo().then(function (response) {
            vm.inProduction = response.inProduction;
            vm.swaggerDisabled = response.swaggerDisabled;
        });

        vm.login = login;
        vm.logout = logout;
        vm.toggleNavbar = toggleNavbar;
        vm.collapseNavbar = collapseNavbar;
        vm.$state = $state;
        vm.goCourse = goCourse;

        function goCourse() {
            collapseNavbar();
            Student.query().$promise.then(function (data) {
                vm.student = data;
                $state.go('viewCourse', {id: vm.student[0].todo_lesson.id});
            });


        }

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

        Principal.getStudent().then(function (data) {
            vm.student = data;
        });
    }
})();
