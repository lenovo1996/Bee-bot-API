var Sequelize = require('sequelize'),
    c = require('../config/db.config');

var Space = c.config.db.define('Space', {
    name: {
        type: Sequelize.STRING,
        field: 'name'
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

module.exports = Space;