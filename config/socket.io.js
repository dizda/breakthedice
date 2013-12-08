/*
 * Module dependencies
 */

// Good read http://stackoverflow.com/questions/8749907/what-is-a-good-session-store-for-a-single-host-node-js-production-app
var express    = require('express'),
    mongoStore = require('connect-mongo')(express);

module.exports = function(server, config, db){

    var parseCookie = require('express').cookieParser('MEAN');
    var io = require('socket.io').listen(server);

    // Link sessions with Express, to know which user is
    var store = new mongoStore({
        db: db.connection.db,
        collection: 'sessions'
    });

    io.configure(function() {
        io.set('authorization', function(handshake, accept) {
            if (handshake.headers.cookie) {
                parseCookie(handshake, null, function(err) {
                    // we used the signedCookies property since we have a secret
                    // save the session ID to the socket object, we can access it later
                    handshake.sessionID = handshake.signedCookies['connect.sid'];

                    store.get(handshake.sessionID, function(err, session) {
                        if (err)
                        {
                            accept(err.message, false); //Turn down the connection
                        }
                        else
                        {
                            // we have the same Express session, reference it
                            handshake.session = session; //Accept the session
                            accept(null, true);
                        }
                    });
                });
            } else {
                // they client has no session yet, don't let them connect
                console.log('NO SESSION FUCKER');
                accept('No session.', false);
            }
        });
    });



    io.of('/api').on('connection', function(socket){

        console.log(socket.handshake.sessionID);
        var user = null;

        if (socket.handshake.session.passport && socket.handshake.session.passport.user)
        {
            user = socket.handshake.session.passport.user;
        }
        

        //Requests
        socket.on('chat:send', function(data){
            // socket.handshake.sessionID is the session id with Passeport credentials
            //console.log('LOL MEC : '+socket.handshake.sessionID);
            console.log('LOL MEC2 : '+user);
            socket.broadcast.emit('chat:receive', data);

        });
        //responses

    });

}