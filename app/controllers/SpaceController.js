const {
    isSuperAdmin,
    isAdmin,
    isModer,
    isMember,
    isLoggedIn,
    getUserByToken
} = require('../helpers/permission');

let SpaceService = require('../services/SpaceService'),
    UserSpaceService = require('../services/UserSpaceService');

let SpaceController = {

    async getList(req, res) {
        let accessToken = req.query.access_token;
        let list = await SpaceService.getList(accessToken);
        res.send(list);
    },

    async post(req, res, next) {
        let accessToken = req.body.access_token;

        if (!req.body.name) {
            res.send({
                result: false,
                msg: `field name is required.`
            });
        }

        let user = await getUserByToken(accessToken);

        let data = {
            name: req.body.name,
            createdBy: user.id
        };

        let newSpace = await SpaceService.createSpace(data);

        if (newSpace.result === false) {
            res.send(newSpace);
        }

        await UserSpaceService.createUserSpace({
            createdBy: user.id,
            userId: user.id,
            spaceId: newSpace.id
        });

        res.send({
            result: true,
            data: newSpace
        });
    },

    async put(req, res, next) {
        // code
    },

    async deleteList(req, res, next) {
        // code
    }

};

module.exports = SpaceController;
