const {
  isSuperAdmin,
  isAdmin,
  isModer,
  isMember,
  isLoggedIn,
  getUserByToken
} = require('../modules/permission');

let SpaceService = require('../services/SpaceService'),
  UserSpaceService = require('../services/UserSpaceService');

let SpaceController = {
  /**
   * function get list space belongs user
   * @param req
   * @param res
   * @returns {Promise<void>}
   */
  async getList(req, res) {
    let accessToken = req.query.access_token;
    let user = await getUserByToken(accessToken);
    let list = await SpaceService.getList(accessToken, user);
    res.send(list);
  },

  /**
   * function create new space
   * @param req
   * @param res
   * @returns {Promise<void>}
   */
  async post(req, res) {
    let accessToken = req.body.access_token;

    // check parameter space name
    if (!req.body.name) {
      res.send({
        result: false,
        msg: `field name is required.`
      });
    }

    // get info user
    let user = await getUserByToken(accessToken);

    // init space data
    let data = {
      name: req.body.name,
      createdBy: user.id,
      updatedBy: user.id,
    };

    let newSpace = await SpaceService.createSpace(data, user.id);

    if (newSpace.result) {
      // return error message: space already exist
      res.send(newSpace);
    }

    res.send({
      result: true,
      data: newSpace
    });
  },

  /**
   * function rename space (only super admin can rename space)
   * @param req
   * @param res
   * @returns {Promise<boolean>}
   */
  async put(req, res) {
    let accessToken = req.body.access_token;
    let newName = req.body.new_name;
    let spaceId = req.body.id;

    // check new name and space id
    if (!newName || !spaceId) {
      res.send({
        result: false,
        msg: `Missing parameters. Please check again!`
      });
    }

    if (!await isSuperAdmin(accessToken, spaceId)) {
      // return error message when don't have permission
      res.send({
        result: false,
        msg: `You dont have permission in this space!`
      });
      return false;
    }

    // get user info
    let user = await getUserByToken(accessToken);

    // call function rename space service
    res.send(await SpaceService.renameSpace(newName, user.id, spaceId));
  },

  /**
   * function delete space (soft deleted in UserSpace, Space, and other relationship...)
   * @param req
   * @param res
   * @returns {Promise<boolean>}
   */
  async delete(req, res) {
    let accessToken = req.body.access_token;
    let spaceId = req.body.id;

    // check permission
    if (!await isSuperAdmin(accessToken, spaceId)) {
      res.send({
        result: false,
        msg: `You dont have permission in this space!`
      });
      return false;
    }

    // code

  }

};

module.exports = SpaceController;
