let Sequelize = require('sequelize'),
  c = require('../config/db.config'),
  BaseAttibutes = require('../helpers/BaseAttibutes');

const UserSpace = require('./UserSpace');

let Space = c.config.db.define('Space', {
  // created, updated, deleted column.
  ...BaseAttibutes,

  // list columns in table
  name: {
    type: Sequelize.STRING,
    field: 'name'
  }
}, {
  timestamps: true,
  freezeTableName: true,
  paranoid: true,
});

// set relation for get Member role in UserSpace
Space.hasOne(UserSpace, {as: 'Member', foreignKey: 'space_id', targetKey: 'id'});

module.exports = Space;