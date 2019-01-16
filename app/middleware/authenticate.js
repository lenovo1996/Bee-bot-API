let {isLoggedIn} = require('../modules/permission');

let authenticate = {
  async handle(req) {
    // check header authorization
    let bearerToken = null;
    if (req.headers.authorization) {
      bearerToken = req.headers.authorization.split(' ');

      if (bearerToken[0] !== 'Bearer') {
        return {
          result: false,
          msg: 'Wrong token type'
        };
      }
    } else {
      bearerToken = ''.split(' ');
    }

    let accessToken = bearerToken[1] || req.body.access_token || req.query.access_token;

    // check access_token
    let isLogIn = await
      isLoggedIn(accessToken);
    if (isLogIn.result == false) {
      return isLogIn;
    }

    req.user = isLogIn.data;
    req.access_token = accessToken;

    return {
      result: true
    }
  }
};

module.exports = authenticate;
