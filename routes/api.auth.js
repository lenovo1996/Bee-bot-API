let express = require('express');
let router = express.Router();

let { AuthController } = require('../app/controllers');

router.post('/login', AuthController.login);
router.post('/register', AuthController.register);

module.exports = router;
