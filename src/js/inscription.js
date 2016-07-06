(function () {
    var app = angular.module('dty_plateforme', []);

    app.directive('inscriptionForm', function(){
        return{
            restrict: 'E',
            templateUrl: '/html/templates/inscription.html',
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
                
                this.inscrire= function () {
                    
                }
            },
            controllerAs: 'signInCtrl'
        };
    });
    
    app.directive('connexionForm', function(){
        return{
            restrict: 'E',
            templateUrl: '/html/templates/connexion.html',
            controller: function () {
                this.username="";
                this.password="";
                this.email="";
            },
            controllerAs:"logInCtrl"
        }
    });

    app.directive('dtyHeader', function () {
        return{
            restrict: 'E',
            templateUrl: '/html/templates/nav-bar.html',
            controller: function(){

            },
            controllerAs: 'headerCtrl'
        }
    });

    app.directive('dtyFooter', function () {
            return{
                restrict: 'E',
                templateUrl: '/html/templates/footer.html'
            }
    })
})();