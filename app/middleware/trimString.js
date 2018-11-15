var trimString = {
    async handle(req, res, next) {
        Object.keys(req.body).forEach(function (key) {
            console.log(key);
        });
        console.log(1);

        return {
            result: true
        };
    }
}

module.exports = trimString;