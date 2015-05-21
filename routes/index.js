module.exports = function (app) {
    var roseRoutes = require('./rose')();
    var slackRoutes = require('./slack')();

    app.get('/', function (req, res, next) {
        return res.send(200);
    });

    app.route('/rose')
        .get(roseRoutes.getRose);

    app.route('/slack')
        .post(slackRoutes.postSlack);
};
