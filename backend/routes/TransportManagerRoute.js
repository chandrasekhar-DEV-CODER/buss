const express = require("express");
const router = express.Router();

const { registerManager, loginManager } = require('../controllers/auth.controller');

router.post("/login", loginManager);
router.post("/register", registerManager);

module.exports = router;

