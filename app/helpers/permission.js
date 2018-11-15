const {
    User,
    Space,
    UserSpace
} = require('../models');
var Sequelize = require('sequelize');

var permissions = {};

permissions.isSuperAdmin = function (accessToken, spaceId) {

};

permissions.isAdmin = function (accessToken, spaceId) {

};

permissions.isModer = function (accessToken, spaceId) {

};

permissions.isMember = function (accessToken, spaceId) {

};

permissions.isLoggedIn = async function (accessToken) {
    var user = await permissions.getUserByToken(accessToken);

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