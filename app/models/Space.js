let Sequelize = require('sequelize'),
  c = require('../config/db.config'),
  BaseAttibutes = require('../helpers/BaseAttibutes');

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

module.exports = Space;