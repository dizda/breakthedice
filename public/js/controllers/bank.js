angular.module('mean.system').controller('BankController', ['$scope', '$routeParams', '$location', 'Global', 'Bank', function ($scope, $routeParams, $location, Global, Bank) {
    $scope.global = Global;

    /**
     * Showing the bitcoin address to user to deposit the money
     * The address is unique per-person
     *
     * The address is generated on-the-fly if empty
     */
    $scope.deposit = function() {

        if (!Global.user.depositAddress) {      // dont make unnecessary query

            Bank.get({}, function(user) {
                Global.user = user;
            });

        }

    };



    $scope.withdraw = function() {
        Bank.withdraw({}, function(article) {
            $scope.bank = article;
        });
    };

}]);