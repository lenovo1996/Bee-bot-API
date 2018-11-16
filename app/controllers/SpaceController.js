const {
    isSuperAdmin,
    isAdmin,
    isModer,
    isMember,
    isLoggedIn
} = require('../helpers/permission');

let SpaceService = require('../services/SpaceService');

let SpaceController = {

    async getList(req, res) {
        let accessToken = req.query.access_token;
        let list = await SpaceService.getList(accessToken);
        res.send(list);
    },

    async postList(req, res, next) {

    },

    async putList(req, res, next) {
        // code
    },

    async deleteList(req, res, next) {
        // code
    }

};

module.exports = SpaceController;
