const BaseAttibutes = require('../helpers/BaseAttibutes');

const UserSpace = require('./UserSpace');

module.exports = (sequelize, DataTypes) => {
	let User = sequelize.define('User', {
		// created, updated, deleted column.
		...BaseAttibutes,

		// list columns in table
		name: {
			type: DataTypes.STRING,
			field: 'name'
		},
		email: {
			type: DataTypes.STRING,
			field: 'email'
		},
		password: {
			type: DataTypes.STRING,
			field: 'password'
		},
		accessToken: {
			type: DataTypes.STRING,
			field: 'access_token'
		}
	}, {
		timestamps: true,
		freezeTableName: true,
		paranoid: true,
	});

	User.associate = function (models) {
		// associations can be defined here
	};

	return User;
};