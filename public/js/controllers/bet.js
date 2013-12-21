angular.module('mean.system').controller('BetController', ['$scope', 'Global', '$io', function ($scope, Global, $io) {
    $scope.amount = 0.001;
    $scope.bets   = [];

    /**
     * When a game is played, we add it to livestream history
     */
    $io.on('bet:played', function(game) {
        $scope.messages.push(game);
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
            Global.user = ack;        // ack contain new user balance
        });
    };
}]);