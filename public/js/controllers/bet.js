'use strict';

angular.module('mean.system').controller('BetController', ['$scope', 'Global', '$io', function ($scope, Global, $io) {
    $scope.amount = 0.001;
    $scope.bets   = [];

    /**
     * When a game is played, we add it to livestream history
     */
    $io.on('bet:played', function(game) {
        addBetHistory(game);
    });


    /**
     * When we bet
     */
    $scope.bet = function()
    {
        if ($scope.amount > Global.user.balance) { // check if bet is larger than the user balance
            console.log('too big, bitch!');
            return;
        }

        var data = {
            amount: $scope.amount
        };

        $io.emit('bet:play', data, function(ack) {
            if (ack === false) {
                alert('erreur append!');

                return;
            }

            //$scope.amount = null;
            Global.user = ack.user;        // ack contain new user balance
            addBetHistory(ack.bet);     // add bet to history
            console.log(ack.bet);

        });
    };

    var addBetHistory = function(bet)
    {
        var arr = $scope.bets;

        if (arr.length > 4) {
            $scope.bets.splice(0, 1);
        }
        $scope.bets.push(bet);
    };
}]);