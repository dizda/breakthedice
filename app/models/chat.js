'use strict';


var mongoose = require('mongoose'),
    Schema = mongoose.Schema;


/**
 * Article Schema
 */
var ChatSchema = new Schema({
    message:  {
        type: String,
        trim: true,
        required: true
    },
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
ChatSchema.statics.load = function(id, cb) {
    this.findOne({
        _id: id
    }).populate('user', 'name username').exec(cb);
};


mongoose.model('Chat', ChatSchema);