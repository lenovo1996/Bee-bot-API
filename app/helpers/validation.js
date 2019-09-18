let validation = {
	required(params, requireCols) {
		for (let requireCol of requireCols) {
			if (!params[requireCol]) {
				return {
					status: false,
					missing: requireCol
				};
			}
		}
		return {
			status: true
		};
	}
};

module.exports = validation;