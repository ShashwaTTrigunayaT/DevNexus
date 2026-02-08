const express = require("express");
const { isLoggedIn } = require("../middleware/auth");
const { getAIResponse } = require("../Controllers/aiController");

const router = express.Router();

// POST /ai/chat
router.post("/chat", isLoggedIn(), getAIResponse);

module.exports = router;