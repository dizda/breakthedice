/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    config = require('../../config/config'),
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
ChatSchema.statics = {

};

mongoose.model('Chat', ChatSchema);