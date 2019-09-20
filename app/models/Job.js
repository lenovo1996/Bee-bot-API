const BaseAttibutes = require('../helpers/BaseAttibutes');

module.exports = (sequelize, DataTypes) => {
	let Job = sequelize.define('Job', {
		// created, updated, deleted column.
		...BaseAttibutes,
		
		// list columns in table
		spaceId: {
			type: DataTypes.INTEGER,
			field: 'space_id'
		},
		type: {
			type: DataTypes.STRING,
			field: 'type'
		},
		source: {
			type: DataTypes.STRING,
			field: 'source'
		},
		keywords: {
			type: DataTypes.STRING,
			field: 'keywords'
		},
		changePriceType: {
			type: DataTypes.STRING,
			field: 'change_price_type'
		},
		changePrice: {
			type: DataTypes.STRING,
			field: 'change_price'
		},
		replaceText: {
			type: DataTypes.JSON,
			field: 'replace_text'
		}
	}, {
		timestamps: true,
		freezeTableName: true,
		paranoid: true,
	});

	Job.associate = function (models) {
		Job.belongsTo(models.Space, {as: 'Space', foreignKey: 'space_id', targetKey: 'id'});
	};
	
	return Job;
};