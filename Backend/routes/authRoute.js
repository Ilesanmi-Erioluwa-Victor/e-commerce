const express = require("express");
const {
  createUserCtrl,
  loginUserCtrl,
  getUserCtrl,
  getAllUsersCtrl,
  deleteUserCtrl,
  updateUserCtrl
} = require("../controllers/userCtrl");
const authMiddleware = require("../middlewares/authMiddlware");


const router = express.Router();

router.post("/register", createUserCtrl);
router.post("/login", loginUserCtrl);
router.get("/:id",authMiddleware, getUserCtrl);
router.get("/", getAllUsersCtrl);
router.delete("/:id", deleteUserCtrl);
router.put("/:id", updateUserCtrl);

module.exports = router;
