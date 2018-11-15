var UserService = require('../services/UserService');

var AuthController = {
    async login(req, res, next) {
        var user = {};
        user.email = req.body.email;
        user.password = req.body.password;

        // check email and password match
        var result = await UserService.verify(user);

        res.send(result);
        return;
    },

    async register(req, res, next) {
        var user = {};
        user.name = req.body.name;
        user.email = req.body.email;
        user.password = req.body.password;

        var result = await UserService.register(user);
        res.send(result);
        return;
    }
};

module.exports = AuthController;