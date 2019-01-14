const {User} = require('../models');

const SpaceService = require('../services/SpaceService');

// list role
const roles = {
  'superAdmin': 4,
  'admin': 3,
  'moder': 2,
  'member': 1,
  'other': 0
};

let permissions = {
  /**
   * function check Super Admin role of user in space
   * @param accessToken
   * @param spaceId
   * @returns {Promise<boolean>}
   */
  async isSuperAdmin(accessToken, spaceId) {
    let role = await permissions.getRole(accessToken, spaceId);
    return typeof role != "boolean" && roles['superAdmin'] <= role;
  },

  /**
   * function check Admin role of user in space
   * @param accessToken
   * @param spaceId
   * @returns {Promise<boolean>}
   */
  async isAdmin(accessToken, spaceId) {
    let role = await permissions.getRole(accessToken, spaceId);
    return typeof role != "boolean" && roles['admin'] <= role;
  },

  /**
   * function check Moder role of user in space
   * @param accessToken
   * @param spaceId
   * @returns {Promise<boolean>}
   */
  async isModer(accessToken, spaceId) {
    let role = await permissions.getRole(accessToken, spaceId);
    return typeof role != "boolean" && roles['moder'] <= role;
  },

  /**
   * function check Member role of user in space
   * @param accessToken
   * @param spaceId
   * @returns {Promise<boolean>}
   */
  async isMember(accessToken, spaceId) {
    let role = await permissions.getRole(accessToken, spaceId);
    return typeof role != "boolean" && roles['member'] <= role;
  },

  /**
   * function get role of user in space
   * @param accessToken
   * @param spaceId
   * @returns {Promise<*>}
   */
  async getRole(accessToken, spaceId) {
    let user = await permissions.getUserByToken(accessToken);
    let space = await SpaceService.getOne(user.id, spaceId);
    if (!space) {
      return false;
    }
    return parseInt(space.Member.role);
  },

  /**
   * function check accessToken of user
   * @param accessToken
   * @returns {Promise<*>}
   */
  async isLoggedIn(accessToken) {
    let user = await permissions.getUserByToken(accessToken);

    if (!user) {
      return {
        result: false,
        msg: 'Unauthorization'
      }
    }

    return {
      result: true,
      data: user
    }
  },

  /**
   * function get user record with access token
   * @param accessToken
   * @returns {Promise<*>}
   */
  async getUserByToken(accessToken) {
    return await
      User.findOne({
        where: {
          accessToken: accessToken
        },
        raw: true
      });
  }
};

module.exports = permissions;
