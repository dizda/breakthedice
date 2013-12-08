/*
 * Module dependencies
 */

module.exports = function(server, config){

    var io = require('socket.io').listen(server);

    io.of('/api').on('connection', function(socket){

        //Requests
        socket.on('chat:send', function(data){
            console.log("Receive: "+ JSON.stringify(data));
            socket.broadcast.emit('chat:receive', data);
        });

        //responses

    });

}