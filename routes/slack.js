'use strict';

var config = require('config');

module.exports = function () {

    var e = {};

    e.postSlack = [
        function (req, res, next) {
            var message = JSON.parse(req.body);
            console.log(message);
            if (message.token == config.app.slack.token) {
                var response = {
                    text: '@' + message.user_name + '(squirrel noises)'
                };
                return res.json(response);
            }
            return res.send(200);
        }
    ];

    return e;
};