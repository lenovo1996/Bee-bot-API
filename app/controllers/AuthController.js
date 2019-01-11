let UserService = require('../services/UserService');

let AuthController = {
  /**
   * login function
   * @param req
   * @param res
   * @returns {Promise<void>}
   */
  async login(req, res) {
    let user = {};
    user.email = req.body.email;
    user.password = req.body.password;

    // check email and password match
    let result = await UserService.attemp(user);

    res.send(result);
  },

  /**
   * register function
   * @param req
   * @param res
   * @param next
   * @returns {Promise<void>}
   */
  async register(req, res) {
    let user = {};
    user.name = req.body.name;
    user.email = req.body.email;
    user.password = req.body.password;

    // call function register in UserService
    let result = await UserService.register(user);
    res.send(result);
  }
};

module.exports = AuthController;
