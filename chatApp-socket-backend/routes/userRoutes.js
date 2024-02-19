const express = require('express');
const router = express.Router();
const UserController = require('../controller/userController');

router.post('/', UserController.createUser);
router.get('/', UserController.getAllUsers);

module.exports = router;