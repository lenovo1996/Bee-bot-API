var {isLoggedIn} = require('../helpers/permission');

var authenticate = {
    async handle(req, res, next) {
        var accessToken = req.body.access_token || req.query.access_token;

        // check access_token
        var isLogIn = await isLoggedIn(accessToken);
        if (isLogIn.result == false) {
            return isLogIn;
        }
        console.log(3);

        return {
            result: true
        };
    }
};

module.exports = authenticate;