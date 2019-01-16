let hasAccessToken = {
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

    if (!accessToken) {
      return {
        result: false,
        msg: 'access_token field is required'
      };
    }

    return {
      result: true
    }
  }
};

module.exports = hasAccessToken;
