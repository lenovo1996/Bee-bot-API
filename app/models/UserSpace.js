let Sequelize = require('sequelize'),
    c = require('../config/db.config');

let UserSpace = c.config.db.define('UserSpace', {
    userId: {
        type: Sequelize.INTEGER,
        field: 'user_id'
    },
    spaceId: {
        type: Sequelize.INTEGER,
        field: 'space_id'
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

module.exports = UserSpace;