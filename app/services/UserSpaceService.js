const {UserSpace} = require('../models');

let UserSpaceService = {
  /**
   * function create record to table UserSpace
   * @param userId
   * @param newSpaceId
   * @param role
   * @returns {Promise<*>}
   */
  async createUserSpace(userId, newSpaceId, role) {
    return await UserSpace.create({
      createdBy: userId,
      userId: userId,
      spaceId: newSpaceId,
      role: role
    });
  },

  /**
   * function get record of user in UserSpace
   * @param userId
   * @param spaceId
   * @returns {Promise<*>}
   */
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
