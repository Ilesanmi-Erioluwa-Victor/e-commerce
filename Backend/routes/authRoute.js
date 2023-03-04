const express = require("express");
const {
  createUserCtrl,
  loginUserCtrl,
  getUserCtrl,
  getAllUsersCtrl,
  deleteUserCtrl,
  updateUserCtrl,
  blockUserCtrl,
  unBlockUserCtrl,
} = require("../controllers/userCtrl");
const { authMiddleware, isAdmin } = require("../middlewares/authMiddlware");

const router = express.Router();

router.post("/register", createUserCtrl);
router.post("/login", loginUserCtrl);
router.get("/:id", authMiddleware, isAdmin, getUserCtrl);
router.get("/", getAllUsersCtrl);
router.delete("/:id", deleteUserCtrl);
router.put("/edit-user", authMiddleware, updateUserCtrl);
router.put("/block-user/:id", authMiddleware, isAdmin, blockUserCtrl);
router.put("/unblock-user/:id", authMiddleware, isAdmin, unBlockUserCtrl);

module.exports = router;
