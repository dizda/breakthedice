/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    config = require('../../config/config'),
    Schema = mongoose.Schema;


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
        ref: 'User'
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});


/**
 * Statics
 */
BetSchema.statics = {
    load: function(id, cb) {
        this.findOne({
            _id: id
        }).populate('user', 'username').exec(cb);
    }
};

mongoose.model('Bet', BetSchema);