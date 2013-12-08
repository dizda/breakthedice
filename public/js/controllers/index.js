angular.module('mean.system').controller('IndexController', ['$scope', 'Global', '$io', function ($scope, Global, $io) {
    $scope.global = Global;


    $scope.messages  = [];      // list of messages
    $scope.disabled  = false;   // disable or not the text input

    $io.on('chat:receive', function(message) {
        $scope.messages.push(message);
    });

    $scope.sendMessage = function(event)
    {
        if (event && event.keyCode != 13 || $scope.chatInput === '') {
            return;
        }

        var data     = {};
        data.message = $scope.chatInput;
        data.user    = Global.user.username;
        data.date    = new Date();

        $scope.messages.push(data);

        $io.emit('chat:send', data);
        $scope.chatInput = '';
    };
}]);