let express = require('express');
let router = express.Router();

let {AuthController} = require('../app/controllers');

router.post('/login', AuthController.login);
router.post('/register', AuthController.register);
router.post('/logout', AuthController.logout);

module.exports = router;
