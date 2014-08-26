module.exports = function () {

    var e = {};

    e.postSlack = [
        function (req, res, next) {
            return organizationLib.getOrganizations()
                .then(function (organizations) {
                    var dustOptions = dustLib.buildDustOptions(req);
                    if (!!organizations) {
                        dustOptions.organizations = organizations;
                    }
                    return res.render('admin/organizations', dustOptions);
                })
                .error(function (err) {
                    return next(err);
                })
        }
    ];

    return e;
};