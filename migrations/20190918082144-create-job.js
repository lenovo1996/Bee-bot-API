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
			status: {
				type: Sequelize.INTEGER,
				field: 'status'
			},
			type: {
				type: Sequelize.STRING,
				field: 'type'
			},
			source: {
				type: Sequelize.STRING,
				field: 'source'
			},
			keywords: {
				type: Sequelize.STRING,
				field: 'keywords'
			},
			changePriceType: {
				type: Sequelize.STRING,
				field: 'change_price_type'
			},
			changePrice: {
				type: Sequelize.STRING,
				field: 'change_price'
			},
			replaceText: {
				type: Sequelize.JSON,
				field: 'replace_text'
			},
			// created, updated, deleted column.
			...BaseAttibutes,
		});
	},
	down: (queryInterface, Sequelize) => {
		return queryInterface.dropTable('Job');
	}
};