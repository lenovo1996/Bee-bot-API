var Sequelize = require('sequelize'),
    c = require('../config/db.config');

var User = c.config.db.define( 'groups', {
    name: {
        type: Sequelize.STRING,
        field: 'name'
    },
    createdAt: {
        type: Sequelize.DATE,
        field: 'created_at'
    },
    updatedAt: {
        type: Sequelize.DATE,
        field: 'updated_at'
    },
    createdBy: {
        type: Sequelize.INTEGER,
        field: 'created_by'
    },
    updatedBy: {
        type: Sequelize.INTEGER,
        field: 'updated_by'
    }
} , {
    timestamps: true
});

module.exports = User;