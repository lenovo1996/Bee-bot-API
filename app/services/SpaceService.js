const {Space, UserSpace} = require('../models');
const UserSpaceService = require('./UserSpaceService');

let SpaceService = {
  /**
   * function get list space of user
   * @param accessToken
   * @param user
   * @returns {Promise<Array<Model>>}
   */
  async getList(accessToken, user) {
    // get all space user can access
    let userSpace = await UserSpace.findAll({
      where: {userId: user.id},
      attributes: ['spaceId', 'role'],
      raw: true
    });

    // get spaceId list
    let spaceIdList = [];
    for (item of userSpace) {
      spaceIdList.push(item.spaceId);
    }

    // get information of space with list spaceId
    return await Space.findAll({
      where: {id: spaceIdList},
      include: {
        required: true,
        model: UserSpace,
        as: 'Member',
        attributes: ['role'],
        where: {userId: user.id}
      },
      attributes: ['id', 'name', 'createdBy', 'updatedBy', 'createdAt', 'updatedAt'],
      raw: true
    });
  },

  /**
   * function create space
   * @param data
   * @param userId
   * @returns {Promise<*>}
   */
  async createSpace(data, userId) {
    // check space in database
    let space = await Space.findOne({
      where: data
    });

    if (space) {
      return {
        result: false,
        msg: 'Space already exists.'
      }
    }

    let newSpaceId = null;

    // create space and userSpace record
    await Space.create(data).then(async (space) => {
      newSpaceId = space.id;
      await UserSpaceService.createUserSpace(userId, newSpaceId, 4);
    });

    // return space record
    return await SpaceService.getOne(userId, newSpaceId);
  },

  /**
   * function using for rename space
   * @param newName
   * @param userId
   * @param spaceId
   * @returns {Promise<*>}
   */
  async renameSpace(newName, userId, spaceId) {
    await Space.update({name: newName, updatedBy: userId}, {where: {id: spaceId}});
    return await Space.findOne({
      where: {id: spaceId}
    });
  },

  /**
   * function get record of space, include role of member
   * @param userId
   * @param spaceId
   * @returns {Promise<*>}
   */
  async getOne(userId, spaceId) {
    return await Space.findOne({
      where: {id: spaceId},
      attributes: ['id', 'name', 'createdBy', 'updatedBy', 'createdAt', 'updatedAt'],
      include: {
        required: true,
        model: UserSpace,
        as: 'Member',
        attributes: ['role'],
        where: {userId: userId}
      },
      raw: true
    });
  }

};

module.exports = SpaceService;
