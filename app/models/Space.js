let Sequelize = require('sequelize'),
  c = require('../config/db.config'),
  BaseAttibutes = require('../helpers/BaseAttibutes');

const UserSpace = require('./UserSpace');
const Account = require('./Account');

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
Space.hasOne(Account, {as: 'Account', foreignKey: 'space_id', targetKey: 'id'});
Space.hasMany(UserSpace, {as: 'Members', foreignKey: 'space_id', targetKey: 'id'});

module.exports = Space;