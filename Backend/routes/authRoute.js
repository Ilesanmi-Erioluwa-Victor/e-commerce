const express = require("express");
const { createUserCtrl } = require("../controllers/userCtrl");
const router = express.Router();

router.post("/register", createUserCtrl);

module.exports = router;
