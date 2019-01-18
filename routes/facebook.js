const express = require('express');
const router = express.Router();

const {FacebookController} = require('../app/controllers');

router.get('/get-long-live-access-token', FacebookController.getLongLiveAccessToken);

module.exports = router;