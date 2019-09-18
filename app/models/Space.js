const BaseAttibutes = require('../helpers/BaseAttibutes');

module.exports = (sequelize, DataTypes) => {
	let Space = sequelize.define('Space', {
		// created, updated, deleted column.
		...BaseAttibutes,
		
		// list columns in table
		name: {
			type: DataTypes.STRING,
			field: 'name'
		},
		link: {
			type: DataTypes.STRING,
			field: 'link'
		},
		accessKey: {
			type: DataTypes.STRING,
			field: 'accessKey'
		},
		accessSecret: {
			type: DataTypes.STRING,
			field: 'accessSecret'
		},
	}, {
		timestamps: true,
		freezeTableName: true,
		paranoid: true,
	});
	
	
	Space.associate = function (models) {
		Space.hasOne(models.UserSpace, {as: 'Member', foreignKey: 'space_id', targetKey: 'id'});
		Space.hasOne(models.Account, {as: 'Account', foreignKey: 'space_id', targetKey: 'id'});
		Space.hasMany(models.UserSpace, {as: 'Members', foreignKey: 'space_id', targetKey: 'id'});
		Space.hasMany(models.Job, {as: 'Jobs', foreignKey: 'space_id', targetKey: 'id'});
	};
	
	return Space;
};