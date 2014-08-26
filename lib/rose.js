'use strict';

var config = require('config');
var Promise = require('bluebird');
var request = Promise.promisify(require('request'));

var e = module.exports;

e.isBathroomOccupied = function () {
    var querystring = {
        access_token: config.apps.rose.token
    };
    var options = {
        method: 'POST',
        url: config.websites.spark.devicesUrl + '/' + config.apps.rose.id + '/checkRestrm',
        qs: querystring
    };
    return request(options)
        .spread(function (response, body) {
            var json = JSON.parse(body);
            return json.return_value;
        })
};
