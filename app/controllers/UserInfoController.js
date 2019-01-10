const {
  getUserByToken
} = require('../helpers/permission');

const {userInfo} = require('../modules/UserModule');

const SpaceService = require('../services/SpaceService');

let UserService = require('../services/UserService');

let UserInfoController = {
  async get(req, res) {
    let accessToken = req.query.access_token;
    let user = userInfo(await getUserByToken(accessToken));

    // get space list
    user.spaces = await SpaceService.getList(accessToken);

    res.send(user);
  }
};

module.exports = UserInfoController;