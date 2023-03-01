const express = require("express");
const {
  createUserCtrl,
  loginUserCtrl,
  getUserCtrl,
} = require("../controllers/userCtrl");
const router = express.Router();

router.post("/register", createUserCtrl);
router.post("/login", loginUserCtrl);
router.get("/:id", getUserCtrl);

module.exports = router;
