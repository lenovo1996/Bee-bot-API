const { filter } = require('../helpers/common');

let UserModules = {
  userInfo(rawUser) {
    let displayItems = ['id', 'name', 'email', 'accessToken'];

    return filter(rawUser, displayItems);
  },
};

module.exports = UserModules;