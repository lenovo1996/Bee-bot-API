'use strict';
const BaseAttibutes = require('../app/helpers/BaseAttibutes');

module.exports = {
	up: (queryInterface, Sequelize) => {
		return queryInterface.createTable('Job', {
			id: {
				allowNull: false,
				autoIncrement: true,
				primaryKey: true,
				type: Sequelize.INTEGER
			},
			// list columns in table
			spaceId: {
				type: Sequelize.INTEGER,
				field: 'space_id'
			},
			// list columns in table
			catId: {
				type: Sequelize.INTEGER,
				field: 'cat_id'
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
		return queryInterface.dropTable('Job');
	}
};