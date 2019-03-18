'use strict';
const BaseAttibutes = require('../app/helpers/BaseAttibutes');

module.exports = {
	up: (queryInterface, Sequelize) => {
		return queryInterface.createTable('Account', {
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
			},
			// created, updated, deleted column.
			...BaseAttibutes,
		});
	},
	down: (queryInterface, Sequelize) => {
		return queryInterface.dropTable('Account');
	}
};