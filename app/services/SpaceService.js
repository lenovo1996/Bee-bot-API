const {Space, UserSpace} = require('../models');
const p = require('../helpers/permission');

var SpaceService = {};

SpaceService.getList = async function (accessToken) {
    var user = await p.getUserByToken(accessToken);

    var userSpace = await UserSpace.findAll({
        where: {userId: user.id},
        attributes: ['spaceId']
    });

    var spaceIdList = [];
    for (item of userSpace) {
        spaceIdList.push(item.spaceId);
    }

    return await Space.findAll({
        where: {id: spaceIdList},
        attributes: ['id', 'name']
    });
};

module.exports = SpaceService;