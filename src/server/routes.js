const express = require('express');
const diagnoseHandler = require('./handler');

const router = express.Router();

router.post('/', diagnoseHandler);

module.exports = router;
