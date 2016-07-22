(function() {
    'use strict';

    angular
        .module('objectifDtyApp')
        .controller('RegisterController', RegisterController);


    RegisterController.$inject = ['$timeout', 'Auth', 'LoginService'];

    function RegisterController ($timeout, Auth, LoginService) {

        this.doNotMatch = null;
        this.error = null;
        this.errorUserExists = null;
        this.login = LoginService.open;
        this.register = register;
        this.registerAccount = {};
        this.success = null;

        this.passwordmatch = function () {
            if(this.registerAccount.password !== null && this.confirmPassword !== null) {
                return (this.registerAccount.password == this.confirmPassword)
            } else {
                return false
            }
        };

        $timeout(function (){angular.element('#login').focus();});

        function register () {
            var vm = this;
            if (vm.registerAccount.password !== this.confirmPassword) {
                vm.doNotMatch = 'ERROR';
            } else {
                vm.doNotMatch = null;
                vm.error = null;
                vm.errorUserExists = null;
                vm.errorEmailExists = null;
                vm.registerAccount.activated = true;
                if (vm.registerAccount.code == "coach") {
                    vm.registerAccount.authorities = ["ROLE_COACH"];
                }
                else if (vm.registerAccount.code == "student") {
                    vm.registerAccount.authorities = ["ROLE_USER"];
                }
                else {
                    vm.error = "ERROR";
                    return;
                }


                Auth.createAccount(vm.registerAccount).then(function () {
                    vm.success = 'OK';
                }).catch(function (response) {
                    vm.success = null;
                    if (response.status === 400 && response.data === 'login already in use') {
                        vm.errorUserExists = 'ERROR';
                    } else if (response.status === 400 && response.data === 'e-mail address already in use') {
                        this.errorEmailExists = 'ERROR';
                    } else {
                        vm.error = 'ERROR';
                    }
                });
            }
        }
    }
})();
