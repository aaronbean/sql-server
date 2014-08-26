'use strict';

var e = module.exports;

var roseLib = require('./rose');

e.isValidRespondee = function (username) {
    return ((username != 'slackbot') && (username != 'SQL'));
};

e.getRoseResponse = function (message) {
    roseLib.isBathroomOccupied()
        .then(function (isOccupied) {
            var response = 'I don\'t know about that, ' + message.user_name + ', but I do know the restroom is ';
            response += (isOccupied ? 'occupied' : 'unoccupied');
            return packageResponse(response);
        })
};

function packageResponse(response) {
    return {
        text: response,
        username: "SQL"
    };
}
