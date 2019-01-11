const {filter} = require('../helpers/common');

let UserModules = {
  /**
   * function filter data can display of user
   * @param rawUser
   * @returns {*|{}}
   */
  userInfo(rawUser) {
    // list columns can display to interface
    let displayItems = ['id', 'name', 'email', 'accessToken'];

    return filter(rawUser, displayItems);
  },
};

module.exports = UserModules;