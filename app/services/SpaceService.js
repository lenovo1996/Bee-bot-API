const {Space, UserSpace} = require('../models');
const p = require('../helpers/permission');

let SpaceService = {

    async getList(accessToken) {
        let user = await p.getUserByToken(accessToken);

        let userSpace = await UserSpace.findAll({
            where: {userId: user.id},
            attributes: ['spaceId']
        });

        let spaceIdList = [];
        for (item of userSpace) {
            spaceIdList.push(item.spaceId);
        }

        return await Space.findAll({
            where: {id: spaceIdList},
            attributes: ['id', 'name']
        });
    },

    async createSpace(data) {
        let space = await Space.findOne({
            where: data
        });

        console.log(space);

        if (space) {
            return {
                result: false,
                msg: 'Space already exists.'
            }
        }

        return await Space.create(data);
    }

};

module.exports = SpaceService;
