const {UserSpace, Space} = require('../models');

let UserSpaceService = {

  async createUserSpace(data) {
    return await UserSpace.create(data);
  },

  async getUserSpace(userId, spaceId) {
    return await UserSpace.findOne({
      where: {
        user_id: userId,
        space_id: spaceId
      }
    });
  }

};

module.exports = UserSpaceService;
