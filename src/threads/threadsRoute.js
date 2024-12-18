const express = require('express');
const threadsController = require('./threadsController');

const router = express.Router();

router.post('/', threadsController.createThread);

module.exports = router;
