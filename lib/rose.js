'use strict';

var config = require('config');
var Promise = require('bluebird');
var request = Promise.promisify(require('request'));

var e = module.exports;

e.getOccupancy = function (username) {
    return isRestroomOccupied()
        .then(function (isOccupied) {
            var response;
            if (isOccupied) {
                response = 'Yes, ' + username + ', I fear the restroom is occupied.';
            } else {
                response = 'No, ' + username + ', the restroom is unoccupied.';
            }
            return response;
        })
};

var isRestroomOccupied = e.isRestroomOccupied = function () {
    var querystring = {
        access_token: config.apps.rose.token
    };
    var options = {
        method: 'POST',
        url: config.websites.spark.url + '/' + config.apps.rose.id + '/checkRestrm',
        qs: querystring
    };
    return request(options)
        .spread(function (response, body) {
            var json = JSON.parse(body);
            return !json.return_value;
        })
};
