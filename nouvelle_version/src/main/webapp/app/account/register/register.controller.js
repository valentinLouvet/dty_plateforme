(function() {
    'use strict';

    angular
        .module('objectifDtyApp')
        .controller('RegisterController', RegisterController);


    RegisterController.$inject = [ '$timeout', 'Auth', 'LoginService'];

    function RegisterController ($timeout, Auth, LoginService) {
        //var this = this;

        this.doNotMatch = null;
        this.error = null;
        this.errorUserExists = null;
        this.login = LoginService.open;
        this.register = register;
        this.registerAccount = {};
        this.success = null;
        this.confirmPassword="";


        $timeout(function (){angular.element('#login').focus();});

        this.passwordmatch = function () {
            if(this.registerAccount.password != "" && this.confirmPassword != ""){
                return this.registerAccount.password == this.confirmPassword
            } else {
                return false
            }
        }

        function register () {
            if (this.registerAccount.password !== this.confirmPassword) {
                this.doNotMatch = 'ERROR';
            } else {
                this.registerAccount.langKey =  'en' ;
                this.doNotMatch = null;
                this.error = null;
                this.errorUserExists = null;
                this.errorEmailExists = null;

                Auth.createAccount(this.registerAccount).then(function () {
                    this.success = 'OK';
                }).catch(function (response) {
                    this.success = null;
                    if (response.status === 400 && response.data === 'login already in use') {
                        this.errorUserExists = 'ERROR';
                    } else if (response.status === 400 && response.data === 'e-mail address already in use') {
                        this.errorEmailExists = 'ERROR';
                    } else {
                        this.error = 'ERROR';
                    }
                });
            }
        }
    }
})();
