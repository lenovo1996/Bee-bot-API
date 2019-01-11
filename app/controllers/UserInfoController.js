const {
  getUserByToken
} = require('../modules/permission');

const UserModule = require('../modules/UserModule');

const SpaceService = require('../services/SpaceService');

let UserInfoController = {
  /**
   * function get user information (include space list)
   * @param req
   * @param res
   * @returns {Promise<void>}
   */
  async get(req, res) {
    let accessToken = req.query.access_token;

    // get user information
    let user = UserModule.userInfo(await getUserByToken(accessToken));

    // get space list
    user.spaces = await SpaceService.getList(accessToken, user);

    res.send(user);
  }
};

module.exports = UserInfoController;