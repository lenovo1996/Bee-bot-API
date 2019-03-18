'use strict';
const BaseAttibutes = require('../app/helpers/BaseAttibutes');

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('UserSpace', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
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
	    },
	    // created, updated, deleted column.
	    ...BaseAttibutes,
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('UserSpace');
  }
};