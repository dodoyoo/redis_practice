const express = require('express');
const userController = require('./userController');

const router = express.Router();

router.post('/sign-up', userController.signUp);
router.get('/sign-in', userController.signIn);

module.exports = router;
