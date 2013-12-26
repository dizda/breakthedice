'use strict';

// Good read http://stackoverflow.com/questions/8749907/what-is-a-good-session-store-for-a-single-host-node-js-production-app
var express  = require('express'),
    mongoose = require('mongoose'),
    Chat     = mongoose.model('Chat'),
    User     = mongoose.model('User'),
    Bet      = mongoose.model('Bet');

module.exports = function(server, config, store) {

    var parseCookie = express.cookieParser('MEAN');
    var io = require('socket.io').listen(server);

    // Link sessions with Express, to know which user is
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

        // Mongo ObjectId
        var user = null;

        if (socket.handshake.session.passport && socket.handshake.session.passport.user)
        {
            user = socket.handshake.session.passport.user;
        }


        //Requests
        socket.on('chat:talk', function(data){
            // socket.handshake.sessionID is the session id with Passeport credentials
            //console.log('LOL MEC : '+socket.handshake.sessionID);

            var chat = new Chat({
                message: data.message,
                user:    user
            }).save(function(e, msg) {

                User.findOne(user, function(err, doc) {                 // retrieve the username of the message
                    msg = msg.toObject();
                    msg.user = {
                        id:       doc._id,
                        username: doc.username
                    };
                    socket.broadcast.emit('chat:dispatch', msg);       // transmit the message to other players

                });

            });

        });

        socket.on('bet:play', function(bet, ack){

            User.findOne({
                _id: user
            })
            .exec(function(err, user) {
                if (err) return new Error(err);
                if (!user) return new Error('Failed to load User ' + id);

                if (bet.amount > user.balance) {
                    ack(false);

                    return;
                }

                user.addBalance(bet.amount);
                Bet.addBet(bet.amount, user, function(err, game) {
                    if (err) return new Error(err);

                    socket.broadcast.emit('bet:played', game); // transmit to other player the bet to add it to their history

                    user.save(function(err, user) {            // if the bet is ok, we answer ack with the updated user balance
                        if (err) return new Error(err);

                        var data = {
                            user: user,
                            bet:  game
                        };
                        ack(data);
                    });
                });

            });

        });

    });

};