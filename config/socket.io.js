/*
 * Module dependencies
 */

module.exports = function(server, config){

    var io = require('socket.io').listen(server);

    io.of('/api').on('connection', function(socket){

        //Requests
        socket.on('test/event', function(data){
            console.log("Receive: "+data);
        })

        //responses
        socket.emit('test/another/event', 'from Socket.io');

    });

}