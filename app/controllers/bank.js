'use strict';

/**
 * Show an article
 */
exports.deposit = function(req, res) {
    if (!req.user.depositAddress) {
        // If deposit address doesn't exist, we create it via blockchain API
        req.user.depositAddress = require('crypto').randomBytes(16).toString('base64'); // fake address is created here for example purpose
        req.user.save(function(err, user) {
            res.jsonp(user);
        });

        return;
    }
    res.jsonp(req.user);
};


exports.withdraw = function(req, res) {
    res.jsonp(req.article);
};