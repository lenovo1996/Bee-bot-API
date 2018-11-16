let Sequelize = require('sequelize'),
    c = require('../config/db.config');

let User = c.config.db.define('User', {
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
    createdBy: {
        type: Sequelize.INTEGER,
        field: 'created_by'
    },
    updatedBy: {
        type: Sequelize.INTEGER,
        field: 'updated_by'
    },
    deletedBy: {
        type: Sequelize.INTEGER,
        field: 'deleted_by'
    },
}, {
    timestamps: true,
    underscored: true,
    freezeTableName: true,
    paranoid: true,
});

module.exports = User;