const BaseAttibutes = require('../helpers/BaseAttibutes');

module.exports = (sequelize, DataTypes) => {
	let Account = sequelize.define('Account', {
		// created, updated, deleted column.
		...BaseAttibutes,

		// list columns in table
		name: {
			type: DataTypes.STRING,
			field: 'name'
		},
		spaceId: {
			type: DataTypes.INTEGER,
			field: 'space_id'
		},
		fanpageId: {
			type: DataTypes.INTEGER,
			field: 'fanpage_id'
		},
		accessToken: {
			type: DataTypes.TEXT,
			field: 'access_token'
		},
		avatar: {
			type: DataTypes.STRING,
			field: 'avatar'
		}
	}, {
		timestamps: true,
		freezeTableName: true,
		paranoid: true,
	});

	Account.associate = function (models) {
		// associations can be defined here
	};

	return Account;
};