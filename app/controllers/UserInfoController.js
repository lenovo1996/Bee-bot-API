const {
    getUserByToken
} = require('../helpers/permission');

let UserService = require('../services/UserService');

let UserInfoController = {
    async get(req, res) {
        let accessToken = req.query.access_token;
        let userInfo = await getUserByToken(accessToken);

        res.send(userInfo);
    }
};

module.exports = UserInfoController;