module.exports = function () {

    var e = {};

    e.postSlack = [
        function (req, res, next) {
            console.log(req);
            return res.send(200);
        }
    ];

    return e;
};