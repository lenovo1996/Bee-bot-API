var hasAccessToken = {
    async handle(req, res, next) {
        var accessToken = req.body.access_token || req.query.access_token;

        if (!accessToken) {
            return {
                result: false,
                msg: 'access_token field is required'
            };
        }

        console.log(2);
        return {
            result: true
        };

    }
};

module.exports = hasAccessToken;