const facebookConf = require('../../config/facebook');
const {FB, FacebookApiException} = require('fb');
let OAuth2 = require('oauth').OAuth2;
let oauth2 = new OAuth2(
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
  async getLongLiveAccessToken(req, res) {
    FB.api(
      'oauth/access_token',
      {
        client_id: facebookConf.appId,
        client_secret: facebookConf.appSecret,
        grant_type: 'fb_exchange_token',
        fb_exchange_token: req.query.access_token
      }, function (response) {
        res.send(response);
      });
  }
};

module.exports = FacebookController;