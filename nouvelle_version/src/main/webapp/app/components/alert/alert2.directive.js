(function() {


    var jhiAlert2 = {
        template: '<div class="alerts" ng-cloak="">' +
                        '<div ng-repeat="alert in $ctrl.alerts" ng-class="[alert.position, {\'toast\': alert.toast}]">' +
                            '<uib-alert ng-cloak="" type="{{alert.type}}" close="alert.close($ctrl.alerts)"><pre ng-bind-html="alert.msg"></pre></uib-alert>' +
                        '</div>' +
                  '</div>',
        controller: jhiAlert2Controller
    };

    angular
        .module('objectifDtyApp')
        .component('jhiAlert2', jhiAlert2);

    jhiAlert2Controller.$inject = ['$scope', 'Alert2Service'];

    function jhiAlert2Controller($scope, Alert2Service) {
        var vm = this;

        vm.alerts = Alert2Service.get();
        $scope.$on('$destroy', function () {
            vm.alerts = [];
        });
    }
})();
