let trimString = {
  async handle(req) {
    Object.keys(req.body).forEach(function (key) {
      if (typeof req.body[key] === 'string') {
				req.body[key] = req.body[key].trim();
			}
    });

    return {
      result: true
    };
  }
};

module.exports = trimString;
