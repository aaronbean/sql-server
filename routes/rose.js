'use strict';

var roseLib = require('../lib/rose');

module.exports = function () {

    var e = {};

    e.getRose = [
        function (req, res, next) {
            return roseLib.isRestroomOccupied()
                .then(function (isOccupied) {
                    return res.json({occupied: isOccupied});
                })
        }
    ];

    return e;
};