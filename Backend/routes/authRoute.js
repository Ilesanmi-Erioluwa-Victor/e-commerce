const express = require("express");
const {
  createUserCtrl,
  loginUserCtrl,
  getUserCtrl,
  getAllUsersCtrl,
} = require("../controllers/userCtrl");
const router = express.Router();

router.post("/register", createUserCtrl);
router.post("/login", loginUserCtrl);
router.get("/:id", getUserCtrl);
router.get("/", getAllUsersCtrl);

module.exports = router;
