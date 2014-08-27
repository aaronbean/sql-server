'use strict';

var config = require('config');
var jokeLib = require('../lib/joke');
var roseLib = require('../lib/rose');
var slackLib = require('../lib/slack');
var witLib = require('../lib/wit');

module.exports = function () {

    var e = {};

    e.postSlack = [
        function (req, res, next) {
            var message = req.body;
            if (message.token != config.apps.slack.token) {
                return res.send(403);
            }
            if (!message || !slackLib.isAllowedRespondee(message.user_name)) {
                return res.send(200);
            }
            return slackLib.processMessage(message)
                .then(function (response) {
                    if (!response || global.app.mute) {
                        return res.send(200);
                    }
                    return res.json(response);
                })
                .error(function (err) {
                    return next(err);
                })
        }
    ];

    return e;
};