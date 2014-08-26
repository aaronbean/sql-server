module.exports = function (app) {
    var slackRoutes = require('./slack')();

    app.route('/slack')
        .post(slackRoutes.postSlack);
};
