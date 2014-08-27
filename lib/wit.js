'use strict';

var config = require('config');
var Promise = require('bluebird');
var request = Promise.promisify(require('request'));

var e = module.exports;

e.getOutcomes = function (userText) {
    return requestWit(userText)
        .then(function (wit) {
            if (!!wit.outcomes && wit.outcomes.length > 0) {
                return wit.outcomes[0];
            }
            return Promise.reject(new Error('No outcomes'));
        })
};

e.isConfident = function (confidence) {
    return (confidence > 0.3);
};

var requestWit = e.requestWit = function (userText) {
    var querystring = {
        n: 1,
        q: encodeURIComponent(userText)
    };
    var options = {
        method: 'GET',
        url: config.websites.wit.url + '/message',
        qs: querystring,
        headers: {
            Authorization: 'Bearer ' + config.apps.wit.token,
            Accept: 'application/vnd.wit.20140620'
        }
    };
    return request(options)
        .spread(function (response, body) {
            return JSON.parse(body);
        })
};
