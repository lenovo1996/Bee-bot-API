const {
  User,
  Space,
  UserSpace
} = require('../models');
let Sequelize = require('sequelize');

let permissions = {};

permissions.isSuperAdmin = function (accessToken, spaceId) {

};

permissions.isAdmin = function (accessToken, spaceId) {

};

permissions.isModer = function (accessToken, spaceId) {

};

permissions.isMember = function (accessToken, spaceId) {

};

permissions.isLoggedIn = async function (accessToken) {
  let user = await permissions.getUserByToken(accessToken);

  if (!user) {
    return {
      result: false,
      msg: 'Unauthorization'
    }
  }

  return {
    result: true
  }
};

permissions.getUserByToken = async function (accessToken) {
  return await User.findOne({
    where: {
      accessToken: accessToken
    },
    raw: true
  });
};

module.exports = permissions;
