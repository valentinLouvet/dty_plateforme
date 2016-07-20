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
            if(this.registerAccount.password != "" && this.confirmPassword != "") {
                return (this.registerAccount.password === this.confirmPassword)
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
