let {isLoggedIn} = require('../helpers/permission');

let authenticate = {
  async handle(req) {
    let accessToken = req.body.access_token || req.query.access_token;

    // check access_token
    let isLogIn = await isLoggedIn(accessToken);
    if (isLogIn.result == false) {
      return isLogIn;
    }

    return {
      result: true
    };
  }
};

module.exports = authenticate;
