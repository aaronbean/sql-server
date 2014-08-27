'use strict';

var config = require('config');
var Promise = require('bluebird');
var request = Promise.promisify(require('request'));

var e = module.exports;

e.getJoke = function (category) {
    var querystring = (!!category ? {limitTo: '[' + category + ']'} : null);
    var options = {
        method: 'GET',
        url: config.websites.icndb.url + '/jokes/random',
        qs: querystring
    };
    return request(options)
        .spread(function (response, body) {
            var json = JSON.parse(body);
            return json.value.joke;
        })
};
