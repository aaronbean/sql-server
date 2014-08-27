'use strict';

var e = module.exports;

var _ = require('lodash');
var jokeLib = require('./joke');
var roseLib = require('./rose');
var witLib = require('./wit');

e.isAllowedRespondee = function (username) {
    var blacklist = ['slackbot', 'SQL'];
    return (_.indexOf(blacklist, username) == -1);
};

function packageSlackResponse(response) {
    return {
        text: response,
        username: "SQL"
    };
}

e.processMessage = function (message) {
    return witLib.getOutcomes(message.text)
        .then(function (outcome) {
            console.log(outcome);
            if (!witLib.isConfident(outcome.confidence)) {
                return null;
            }
            switch (outcome.intent) {
                case 'check_restroom':
                    return roseLib.getOccupancy(message.user_name);
                    break;
                case 'sleep':
                    global.app.mute = true;
                    return null;
                    break;
                case 'tell_joke':
                    return jokeLib.getJoke();
                    break;
                case 'wake':
                    global.app.mute = false;
                    return null;
                    break;
                default:
                    return null;
            }
        })
        .then(function (response) {
            if (!response) {
                return null;
            }
            return packageSlackResponse(response);
        })
};
