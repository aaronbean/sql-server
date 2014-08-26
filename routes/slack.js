'use strict';

var config = require('config');
var slackLib = require('../lib/slack');

module.exports = function () {

    var e = {};

    e.postSlack = [
        function (req, res, next) {
            var message = req.body;
            if (message.token != config.apps.slack.token) {
                return res.send(403);
            }
            if (!slackLib.isValidRespondee(message.user_name)) {
                return next();
            }
            return slackLib.getRoseResponse(message)
                .then(function (response) {
                    return res.json(response);
                })
                .error(function (err) {
                    return next(err);
                })
        }
    ];

    return e;
};