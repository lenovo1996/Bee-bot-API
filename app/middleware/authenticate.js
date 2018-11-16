var {isLoggedIn} = require('../helpers/permission');

var authenticate = {
    async handle(req) {
        var accessToken = req.body.access_token || req.query.access_token;

        // check access_token
        var isLogIn = await isLoggedIn(accessToken);
        if (isLogIn.result == false) {
            return isLogIn;
        }

        return {
            result: true
        };
    }
};

module.exports = authenticate;
