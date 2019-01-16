const Sequelize = require('sequelize'),
  c = require('../config/db.config'),
  BaseAttibutes = require('../helpers/BaseAttibutes');

const UserSpace = require('./UserSpace');

let User = c.config.db.define('User', {
  // created, updated, deleted column.
  ...BaseAttibutes,

  // list columns in table
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
  }
}, {
  timestamps: true,
  freezeTableName: true,
  paranoid: true,
});

module.exports = User;