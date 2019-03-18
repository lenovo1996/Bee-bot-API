let Sequelize = require('sequelize');
let BaseAttibutes = {
	createdBy: {
		type: Sequelize.INTEGER,
		field: 'created_by'
	},
	updatedBy: {
		type: Sequelize.INTEGER,
		field: 'updated_by'
	},
	deletedBy: {
		type: Sequelize.INTEGER,
		field: 'deleted_by'
	},
	createdAt: {
		type: Sequelize.DATE,
		field: 'created_at'
	},
	updatedAt: {
		type: Sequelize.DATE,
		field: 'updated_at'
	},
	deletedAt: {
		type: Sequelize.DATE,
		field: 'deleted_at'
	}
};

module.exports = BaseAttibutes;