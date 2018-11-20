let UserService = require('../services/UserService');

let AuthController = {
    async login(req, res, next) {
        let user = {};
        user.email = req.body.email;
        user.password = req.body.password;

        // check email and password match
        let result = await UserService.attemp(user);

        res.send(result);
        return;
    },

    async register(req, res, next) {
        let user = {};
        user.name = req.body.name;
        user.email = req.body.email;
        user.password = req.body.password;

        let result = await UserService.register(user);
        res.send(result);
        return;
    }
};

module.exports = AuthController;
