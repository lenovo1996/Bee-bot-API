let Sequelize = require('sequelize'),
  c = require('../config/db.config'),
  BaseAttibutes = require('../helpers/BaseAttibutes');

let UserSpace = c.config.db.define('UserSpace', {
  // created, updated, deleted column.
  ...BaseAttibutes,

  // list columns in table
  userId: {
    type: Sequelize.INTEGER,
    field: 'user_id'
  },
  spaceId: {
    type: Sequelize.INTEGER,
    field: 'space_id'
  },
  role: {
    type: Sequelize.INTEGER,
    field: 'role'
  }
}, {
  timestamps: true,
  freezeTableName: true,
  paranoid: true,
});

module.exports = UserSpace;