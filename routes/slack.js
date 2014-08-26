'use strict';

var config = require('config');

module.exports = function () {

    var e = {};

    e.postSlack = [
        function (req, res, next) {
            var message = req.body;
            console.log(message);
            if (message.token != config.apps.slack.token) {
                return res.send(403);
            }
            var response = {
                text: '@' + message.user_name + '(squirrel noises)'
            };
            return res.json(response);
        }
    ];

    return e;
};