const {UserSpace} = require('../models');

let UserSpaceService = {

    async createUserSpace(data) {
        return await UserSpace.create(data);
    }

};

module.exports = UserSpaceService;
