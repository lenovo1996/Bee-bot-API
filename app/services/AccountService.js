const {Account} = require('../models');

let AccountService = {
  /**
   * function create record to table UserSpace
   * @param userId
   * @param newSpaceId
   * @param role
   * @returns {Promise<*>}
   */
  async createAccount(data) {
    return await Account.create(data);
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

module.exports = AccountService;
