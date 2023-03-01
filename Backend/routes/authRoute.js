const express = require("express");
const { createUserCtrl, loginUserCtrl } = require("../controllers/userCtrl");
const router = express.Router();

router.post("/register", createUserCtrl);
router.post("/login", loginUserCtrl);

module.exports = router;
