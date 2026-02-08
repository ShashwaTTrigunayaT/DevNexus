const express = require('express');
const router = express.Router();
const { executeCode } = require('../Controllers/executeController');

// Define the POST route
router.post('/', executeCode);

module.exports = router;