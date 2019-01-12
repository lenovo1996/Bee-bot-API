const facebookConf = require('../config/facebook');
var OAuth2 = require('oauth').OAuth2;
var oauth2 = new OAuth2(
  facebookConf.appId,
  facebookConf.appSecret,
  "",
  "https://www.facebook.com/dialog/oauth",
  "https://graph.facebook.com/oauth/access_token",
  null
);

let FacebookController = {
  /**
   * function get oauth facebook
   * @param req
   * @param res
   * @returns {Promise<void>}
   */
  async getAuth(req, res) {
    let redirectUri = `${facebookConf.rootUrl + facebookConf.redirectUri}`;
    let params = {
      'redirect_uri': redirectUri,
      'scope': 'manage_pages,publish_pages'
    };
    res.redirect(oauth2.getAuthorizeUrl(params));
  },

  /**
   * function callback (get access token, and subscribe_pages)
   * @param req
   * @param res
   * @returns {Promise<void>}
   */
  async getCallback(req, res) {
    if (req.error_reason) {
      res.send(req.error_reason);
      return false;
    }
    if (req.query.code) {
      let loginCode = req.query.code;
      let redirectUri = `${facebookConf.rootUrl + facebookConf.redirectUri}`;

      oauth2.getOAuthAccessToken(
        loginCode,
        {
          grant_type: 'authorization_code',
          redirect_uri: redirectUri
        },
        function (err, accessToken, refreshToken, params) {
          if (err) {
            res.send(err);
            return false;
          }
          res.send(accessToken);
          return true;
        }
      );
    } else {
      res.send(req.query);
      return false;
    }
  }
};

module.exports = FacebookController;