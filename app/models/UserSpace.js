const BaseAttibutes = require('../helpers/BaseAttibutes');

module.exports = (sequelize, DataTypes) => {
	let UserSpace = sequelize.define('UserSpace', {
		// created, updated, deleted column.
		...BaseAttibutes,

		// list columns in table
		userId: {
			type: DataTypes.INTEGER,
			field: 'user_id'
		},
		spaceId: {
			type: DataTypes.INTEGER,
			field: 'space_id'
		},
		role: {
			type: DataTypes.INTEGER,
			field: 'role'
		}
	}, {
		timestamps: true,
		freezeTableName: true,
		paranoid: true,
	});


	UserSpace.associate = function (models) {
		UserSpace.belongsTo(models.User, {as: 'user'});
	};

	return UserSpace;
};
