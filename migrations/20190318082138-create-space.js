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
			link: {
				type: Sequelize.STRING,
				field: 'link'
			},
			accessKey: {
				type: Sequelize.STRING,
				field: 'accessKey'
			},
			accessSecret: {
				type: Sequelize.STRING,
				field: 'accessSecret'
			},
			// created, updated, deleted column.
			...BaseAttibutes,
		});
	},
	down: (queryInterface, Sequelize) => {
		return queryInterface.dropTable('Space');
	}
};