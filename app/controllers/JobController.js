const {
	getUserByToken
} = require('../modules/permission');

const JobService = require('../services/JobService');

let JobController = {
	async getList(req, res) {
		let accessToken = req.access_token;
		let spaceId = req.body.spaceId;
		let user = await getUserByToken(accessToken);
		let list = await JobService.getList(spaceId, user);
		res.send(list);
		return true;
	},
	
	async post(req, res) {
		let accessToken = req.access_token;
		let user = await getUserByToken(accessToken);
		
		let data = req.body;
		
		data.createdBy = user.id;
		data.updatedBy = user.id;
		res.send(await JobService.createJob(data));
		return true;
	}
};

module.exports = JobController;