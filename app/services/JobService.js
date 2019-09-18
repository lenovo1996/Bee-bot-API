const {Job} = require('../models');

let JobService = {
	async createJob(data) {
		return await Job.create(data);
	},
	
	async getList(spaceId, user) {
		// get all job of user
		return await Job.findAll({
			where: {spaceId: spaceId, createdBy: user.id},
			attributes: ['id', 'spaceId', 'type', 'source', 'keywords', 'changePriceType', 'changePrice', 'replaceText']
		});
	}
	
	
};

module.exports = JobService;