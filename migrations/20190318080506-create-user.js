'use strict';
const BaseAttibutes = require('../app/helpers/BaseAttibutes');

module.exports = {
	up: (queryInterface, Sequelize) => {
		return queryInterface.createTable('User', {
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
			},
			// created, updated, deleted column.
			...BaseAttibutes,
		});
	},
	down: (queryInterface, Sequelize) => {
		return queryInterface.dropTable('User');
	}
};