'use strict';


var mongoose = require('mongoose'),
    Schema   = mongoose.Schema,
    Big      = require('../../node_modules/big.js/big');


/**
 * Article Schema
 */
var BetSchema = new Schema({
    rangeMin:    Number,
    rangeMax:    Number,
    bet:         Number,
    chanceToWin: Number,
    payout:      Number,
    result:      Number,
    profit:      Number,
    won:         Boolean,
    clientSeed:  String,
    serverSeed:  String,
    user: {
        type: Schema.ObjectId,
        ref:  'User'
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});


/**
 * Statics
 */
BetSchema.statics.load = function(id, cb) {
    this.findOne({
        _id: id
    }).populate('user', 'name username').exec(cb);
};

BetSchema.statics.addBet = function(amount, user, callback) {
    var bet = new this();

    bet.bet  = new Big(amount).toFixed(8);
    bet.user = user;

    bet.save(function(err, game) {
        callback(err, game);
    });
};

mongoose.model('Bet', BetSchema);