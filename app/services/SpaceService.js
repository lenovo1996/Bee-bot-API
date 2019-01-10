const {Space, UserSpace} = require('../models');
const p = require('../helpers/permission');

let SpaceService = {

  async getList(accessToken) {
    let user = await p.getUserByToken(accessToken);

    let userSpace = await UserSpace.findAll({
      where: {userId: user.id},
      attributes: ['spaceId'],
      raw: true
    });

    let spaceIdList = [];
    for (item of userSpace) {
      spaceIdList.push(item.spaceId);
    }

    return await Space.findAll({
      where: {id: spaceIdList},
      attributes: ['id', 'name', 'createdBy', 'updatedBy', 'createdAt', 'updatedAt']
    });
  },

  async createSpace(data) {
    let space = await Space.findOne({
      where: data
    });

    if (space) {
      return {
        result: false,
        msg: 'Space already exists.'
      }
    }

    return await Space.create(data);
  },

  async renameSpace(newName, userId, spaceId) {
    await Space.update({name: newName, updatedBy: userId}, {where: {id: spaceId}});
    return await Space.findOne({
      where: {id: spaceId}
    });
  }

};

module.exports = SpaceService;
