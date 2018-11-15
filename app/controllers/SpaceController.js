const {
    isSuperAdmin,
    isAdmin,
    isModer,
    isMember,
    isLoggedIn
} = require('../helpers/permission');

var SpaceService = require('../services/SpaceService');

var SpaceController = {

    async getList(req, res, next) {
        var accessToken = req.body.access_token || req.query.access_token;
        var list = await SpaceService.getList(accessToken);
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