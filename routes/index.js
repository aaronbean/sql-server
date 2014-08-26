module.exports = function (app) {
    var roseRoutes = require('./rose')();
    var slackRoutes = require('./slack')();

    app.route('/rose')
        .get(roseRoutes.getRose);

    app.route('/slack')
        .post(slackRoutes.postSlack);
};
