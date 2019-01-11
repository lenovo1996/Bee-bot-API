let trimString = {
  async handle(req) {
    Object.keys(req.body).forEach(function (key) {
      req.body[key] = req.body[key].trim();
    });

    return {
      result: true
    };
  }
};

module.exports = trimString;
