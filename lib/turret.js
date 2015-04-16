'use strict';

var config = require('config');
var Promise = require('bluebird');
var request = Promise.promisify(require('request'));

var e = module.exports;

e.shoot = function (name) {
    switch (name) {
        case 'tyson':
            return operateTurret({ right: 1000, fire: 1 })
                .then(function () {
                    return 'Firing sequence complete.';
                })
    }
};

var operateTurret = function (options) {
    options = options || {};
    var promises = [];
    if (!!options.up) {
        promises.push({ method: 'GET', url: config.websites.turret.url + '/turret/up', qs: { duration: options.up } });
    }
    if (!!options.left) {
        promises.push({ method: 'GET', url: config.websites.turret.url + '/turret/left', qs: { duration: options.left } });
    }
    if (!!options.down) {
        promises.push({ method: 'GET', url: config.websites.turret.url + '/turret/down', qs: { duration: options.down } });
    }
    if (!!options.right) {
        promises.push({ method: 'GET', url: config.websites.turret.url + '/turret/right', qs: { duration: options.right } });
    }
    if (!!options.fire) {
        promises.push({ method: 'GET', url: config.websites.turret.url + '/turret/fire', qs: { shots: options.fire } });
    }
    return Promise.map(promises, request, { concurrency: 1 })
        .finally(function () {
            return request({ method: 'GET', url: config.websites.turret.url + '/turret/park' })
        })
};
