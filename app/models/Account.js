let Sequelize = require('sequelize'),
  c = require('../config/db.config'),
  BaseAttibutes = require('../helpers/BaseAttibutes');

let Account = c.config.db.define('Account', {
  // created, updated, deleted column.
  ...BaseAttibutes,

  // list columns in table
  name: {
    type: Sequelize.STRING,
    field: 'name'
  },
  spaceId: {
    type: Sequelize.INTEGER,
    field: 'space_id'
  },
  fanpageId: {
    type: Sequelize.INTEGER,
    field: 'fanpage_id'
  },
  accessToken: {
    type: Sequelize.TEXT,
    field: 'access_token'
  },
  avatar: {
    type: Sequelize.STRING,
    field: 'avatar'
  }
}, {
  timestamps: true,
  freezeTableName: true,
  paranoid: true,
});

module.exports = Account;