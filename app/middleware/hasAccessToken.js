var hasAccessToken = {
    async handle(req) {
        var accessToken = req.body.access_token || req.query.access_token;

        if (!accessToken) {
            return {
                result: false,
                msg: 'access_token field is required'
            };
        }

        return {
            result: true
        };

    }
};

module.exports = hasAccessToken;
