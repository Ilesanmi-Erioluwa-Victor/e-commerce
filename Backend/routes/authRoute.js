const express = require("express");
const {
  createUserCtrl,
  loginUserCtrl,
  getUserCtrl,
  getAllUsersCtrl,
  deleteUserCtrl
} = require("../controllers/userCtrl");
const router = express.Router();

router.post("/register", createUserCtrl);
router.post("/login", loginUserCtrl);
router.get("/:id", getUserCtrl);
router.get("/", getAllUsersCtrl);
router.get("/:id", deleteUserCtrl);

module.exports = router;
