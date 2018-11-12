var Sequelize = require('sequelize'),
    c = require('../config/db.config');

var User = c.config.db.define( 'users', {
    name: {
        type: Sequelize.STRING,
        field: 'name'
    },
    email: {
        type: Sequelize.STRING,
        field: 'email'
    },
    password: {
        type: Sequelize.STRING,
        field: 'password'
    },
    accessToken: {
        type: Sequelize.STRING,
        field: 'access_token'
    },
    createdAt: {
        type: Sequelize.DATE,
        field: 'created_at'
    },
    updatedAt: {
        type: Sequelize.DATE,
        field: 'updated_at'
    }
} , {
    timestamps: true
});

module.exports = User;