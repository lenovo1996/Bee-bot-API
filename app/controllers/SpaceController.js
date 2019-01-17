const {
  isSuperAdmin,
  isAdmin,
  isModer,
  isMember,
  isLoggedIn,
  getUserByToken,
  getRole
} = require('../modules/permission');

let SpaceService = require('../services/SpaceService');
let UserService = require('../services/UserService');
let UserSpaceService = require('../services/UserSpaceService');

let SpaceController = {

  async getById(req, res) {
    let accessToken = req.access_token;
    let user = req.user;
    let spaceId = req.params.spaceId;

    // check user has in space
    let userSpace = await UserSpaceService.getUserSpace(user.id, spaceId);

    if (!userSpace) {
      res.send({
        result: false,
        msg: "You dont have permission"
      });
      return false;
    }

    let space = await SpaceService.getOne(user.id, spaceId);

    res.send({
      result: true,
      space: space
    });
  },

  /**
   * function get list space belongs user
   * @param req
   * @param res
   * @returns {Promise<boolean>}
   */
  async getList(req, res) {
    let accessToken = req.access_token;
    let user = await getUserByToken(accessToken);
    let list = await SpaceService.getList(accessToken, user);
    res.send(list);
    return true;
  },

  /**
   * function create new space
   * @param req
   * @param res
   * @returns {Promise<boolean>}
   */
  async post(req, res) {
    let accessToken = req.access_token;

    // check parameter space name
    if (!req.body.name) {
      res.send({
        result: false,
        msg: `field name is required.`
      });
      return false;
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
      return false;
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
    let accessToken = req.access_token;
    let newName = req.body.new_name;
    let spaceId = req.body.id;

    // check new name and space id
    if (!newName || !spaceId) {
      res.send({
        result: false,
        msg: `Missing parameters. Please check again!`
      });
      return false;
    }

    if (!await isAdmin(accessToken, spaceId)) {
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
    let accessToken = req.access_token;
    let spaceId = req.body.id;

    // check permission
    if (!await isAdmin(accessToken, spaceId)) {
      res.send({
        result: false,
        msg: `You dont have permission in this space!`
      });
      return false;
    }

    // code
    res.send({
      result: false,
      msg: `Comming soon`
    });
  },

  /**
   * function add member to space
   * @param req
   * @param res
   * @returns {Promise<boolean>}
   */
  async postMember(req, res) {
    let accessToken = req.access_token;
    let userEmail = req.body.email;
    let spaceId = req.body.space_id;

    // check member email and space id
    if (!userEmail || !spaceId) {
      res.send({
        result: false,
        msg: `Missing parameters. Please check again!`
      });
      return false;
    }

    // check permission
    if (!await isAdmin(accessToken, spaceId)) {
      res.send({
        result: false,
        msg: `You dont have permission in this space!`
      });
      return false;
    }

    // check user exist
    let user = await UserService.getUserByEmail(userEmail);
    if (!user) {
      res.send({
        result: false,
        msg: `Member do not exist.`
      });
      return false;
    }

    // check user already in space
    let userSpace = await UserSpaceService.getUserSpace(user.id, spaceId);
    if (userSpace) {
      res.send({
        result: false,
        msg: `Member already in space.`
      });
      return false;
    }

    // add user to space
    await UserSpaceService.createUserSpace(user.id, spaceId, 1);
    res.send({
      result: true,
      msg: `Add member ${userEmail} to space success!`
    });
    return true;
  },

  async deleteMember(req, res) {
    let userData = req.user;
    let accessToken = req.access_token;
    let userId = req.body.user_id;
    let spaceId = req.body.space_id;

    if (userData.id == userId) {
      res.send({
        result: false,
        msg: `You can not delete yourself!`
      });
      return false;
    }

    // check member email and space id
    if (!userId || !spaceId) {
      res.send({
        result: false,
        msg: `Missing parameters. Please check again!`
      });
      return false;
    }

    // check permission
    if (!await isAdmin(accessToken, spaceId)) {
      res.send({
        result: false,
        msg: `You dont have permission in this space!`
      });
      return false;
    }

    // check user already in space
    let userSpace = await UserSpaceService.getUserSpace(userId, spaceId);
    if (!userSpace) {
      res.send({
        result: false,
        msg: `Member not in space.`
      });
      return false;
    }

    // remove user in space
    await userSpace.destroy();
    res.send({
      result: true,
      msg: `Remove success!`
    });
    return true;
  },

  /**
   * function set role for member
   * @param req
   * @param res
   * @returns {Promise<boolean>}
   */
  async postPermission(req, res) {
    let userData = req.user;
    let accessToken = req.access_token;
    let userId = req.body.user_id;
    let spaceId = req.body.space_id;
    let permission = req.body.permission;

    // check member email and space id
    if (!userId || !spaceId) {
      res.send({
        result: false,
        msg: `Missing parameters. Please check again!`
      });
      return false;
    }

    if (userData.id == userId) {
      res.send({
        result: false,
        msg: `You can not set permission of yourself!`
      });
      return false;
    }

    // check permission
    if (!await isAdmin(accessToken, spaceId)) {
      res.send({
        result: false,
        msg: `You dont have permission in this space!`
      });
      return false;
    }

    // check user already in space
    let userSpace = await UserSpaceService.getUserSpace(userId, spaceId);
    if (!userSpace) {
      res.send({
        result: false,
        msg: `Member not in space.`
      });
      return false;
    }

    let roleListCanAccess = getRole();
    if (roleListCanAccess.indexOf(permission) === -1) {
      res.send({
        result: false,
        msg: `Can not set permission. Please check again.`
      });
      return false;
    }

    userSpace.set('role', permission);
    await userSpace.save();
    res.send({
      result: true,
      msg: `Set permission success`
    });
    return false;
  }
};

module.exports = SpaceController;
