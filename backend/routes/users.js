const express = require('express');
const router = express.Router();
const userController = require('../app/api/controllers/users');

router.post('/signUp', userController.create);
router.post('/signIn', userController.authenticate);

module.exports = router;