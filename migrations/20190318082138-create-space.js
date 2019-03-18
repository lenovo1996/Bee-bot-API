'use strict';
const BaseAttibutes = require('../app/helpers/BaseAttibutes');

module.exports = {
	up: (queryInterface, Sequelize) => {
		return queryInterface.createTable('Space', {
			id: {
				allowNull: false,
				autoIncrement: true,
				primaryKey: true,
				type: Sequelize.INTEGER
			},
			name: {
				type: Sequelize.STRING,
				field: 'name'
			},
			// created, updated, deleted column.
			...BaseAttibutes,
		});
	},
	down: (queryInterface, Sequelize) => {
		return queryInterface.dropTable('Space');
	}
};