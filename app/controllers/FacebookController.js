const facebookConf = require('../config/facebook');
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
  async getAuth(req, res) {
    let redirectUri = `${facebookConf.rootUrl + facebookConf.redirectUri}`;
    let params = {
      'redirect_uri': redirectUri,
      'scope': 'manage_pages,publish_pages'
    };

    let endpointUrl = oauth2.getAuthorizeUrl(params);

    res.send({
      endpoint: endpointUrl
    });
  },

  /**
   * function callback (get access token, and subscribe_pages)
   * @param req
   * @param res
   * @returns {Promise<void>}
   */
  async getCallback(req, res) {
    if (req.error_reason) {
      res.send({
        result: false,
        msg: req.error_reason
      });
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
            res.send({
              result: false,
              msg: err
            });
            return false;
          }

          // call facebook graph (get list fanpage facebook)
          FB.api(
            'me/accounts',
            {
              limit: 500,
              access_token: accessToken
            }, function (response) {
              res.send({
                result: true,
                accessToken: accessToken,
                data: response
              });
            });
          return true;
        }
      );
    } else {
      res.send({
        result: false,
        msg: 'Something when wrong'
      });
      return false;
    }
  },

};

module.exports = FacebookController;