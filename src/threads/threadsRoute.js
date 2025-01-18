const express = require('express');
const threadsController = require('./threadsController');

const router = express.Router();

router.post('/', threadsController.createThread);
router.get('/', threadsController.getThread);

module.exports = router;
