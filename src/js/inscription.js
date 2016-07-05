(function () {
    var app = angular.module('dty_plateforme', []);

    app.directive('inscriptionForm', ['$http', function(){
        return{
            restrict: 'E',
            templateUrl: '../../html/templates/inscription.html',
            controller: function(){
                this.username="";
                this.password="";
                this.confirmpwd="";
                this.email="";

                this.checkpwd= function(){
                    if(this.password!="" && this.confirmpwd!=""){
                        return (this.password==this.confirmpwd)
                    }
                    else{
                        return false;
                    }
                };
            },
            controllerAs: 'logInCtrl'
        };
    }]);
})();