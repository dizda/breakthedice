angular.module('mean.system').controller('ChatController', ['$scope', 'Global', '$io', function ($scope, Global, $io) {
    $scope.global = Global;


    $scope.messages  = [];      // list of messages
    $scope.disabled  = false;   // disable or not the text input

    /**
     * When receive a message from someone
     *
     * @param {object} message
     */
    $io.on('chat:dispatch', function(message) {
        $scope.messages.push(message);
    });

    $scope.sendMessage = function(event)
    {
        if (event && event.keyCode != 13 || $scope.chatInput === '') {
            return;
        }

        var data      = {};
        data.message  = $scope.chatInput;
        data.date     = new Date();

        $io.emit('chat:talk', data);                    // send to server the chat msg

        data.user = {username: Global.user.username};   // add local username
        $scope.messages.push(data);                     // add the msg to chat history
        $scope.chatInput = '';
    };
}]);