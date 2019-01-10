const {
  isSuperAdmin,
  isAdmin,
  isModer,
  isMember,
  isLoggedIn,
  getUserByToken
} = require('../helpers/permission');

let SpaceService = require('../services/SpaceService'),
  UserSpaceService = require('../services/UserSpaceService');

let SpaceController = {

  async getList(req, res) {
    let accessToken = req.query.access_token;
    let list = await SpaceService.getList(accessToken);
    res.send(list);
  },

  async post(req, res, next) {
    let accessToken = req.body.access_token;

    if (!req.body.name) {
      res.send({
        result: false,
        msg: `field name is required.`
      });
    }

    let user = await getUserByToken(accessToken);

    let data = {
      name: req.body.name,
      createdBy: user.id,
      updatedBy: user.id,
    };

    let newSpace = await SpaceService.createSpace(data);

    if (newSpace.result === false) {
      res.send(newSpace);
    }

    await UserSpaceService.createUserSpace({
      createdBy: user.id,
      userId: user.id,
      spaceId: newSpace.id
    });

    res.send({
      result: true,
      data: newSpace
    });
  },

  async put(req, res) {
    let accessToken = req.body.access_token;

    let newName = req.body.new_name;
    let spaceId = req.body.id;

    if (!newName || !spaceId) {
      res.send({
        result: false,
        msg: `Missing parameters. Please check again!`
      });
    }

    let user = await getUserByToken(accessToken);

    // check user in space
    let userSpace = await UserSpaceService.getUserSpace(user.id, spaceId);

    if (!userSpace) {
      res.send({
        result: false,
        msg: `You dont have permission in this space!`
      });
    }

    res.send(await SpaceService.renameSpace(newName, user.id, spaceId));
  },

  async delete(req, res, next) {
    // code
  }

};

module.exports = SpaceController;
