const express = require("express");
const {
  createUserCtrl,
  loginUserCtrl,
  getUserCtrl,
  getAllUsersCtrl,
  deleteUserCtrl,
  updateUserCtrl,
} = require("../controllers/userCtrl");
const { authMiddleware, isAdmin } = require("../middlewares/authMiddlware");

const router = express.Router();

router.post("/register", createUserCtrl);
router.post("/login", loginUserCtrl);
router.get("/:id", authMiddleware, isAdmin, getUserCtrl);
router.get("/", getAllUsersCtrl);
router.delete("/:id", deleteUserCtrl);
router.put("/:id", updateUserCtrl);

module.exports = router;
