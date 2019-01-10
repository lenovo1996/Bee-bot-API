let trimString = {
  async handle(req) {
    console.log(req.body);
    Object.keys(req.body).forEach(function (key) {
      req.body[key] = req.body[key].trim();
    });

    return {
      result: true
    };
  }
};

module.exports = trimString;
