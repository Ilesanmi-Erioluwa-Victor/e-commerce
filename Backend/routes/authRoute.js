const express = require('express');
const {
  createUserCtrl,
  loginUserCtrl,
  getUserCtrl,
  getAllUsersCtrl,
  deleteUserCtrl,
  updateUserCtrl,
  blockUserCtrl,
  unBlockUserCtrl,
  RefreshTokenHandlerCtrl,
  logOutCtrl,
  updatePassword,
  forgotPasswordToken,
  resetPassword,
} = require('../controllers/userCtrl');
const { authMiddleware, isAdmin } = require('../middlewares/authMiddlware');

const router = express.Router();

router.post('/register', createUserCtrl);
router.post('/login', loginUserCtrl);
router.get('/refresh', RefreshTokenHandlerCtrl);
router.post('/forgot-password', forgotPasswordToken);
router.put('/reset-password/:token', resetPassword);
router.get('/logout', logOutCtrl);
router.put('/password', authMiddleware, updatePassword);
router.get('/:id', authMiddleware, isAdmin, getUserCtrl);
router.get('/', getAllUsersCtrl);

router.delete('/:id', authMiddleware, deleteUserCtrl);
router.put('/edit-user', authMiddleware, updateUserCtrl);
router.put('/block-user/:id', authMiddleware, isAdmin, blockUserCtrl);
router.put('/unblock-user/:id', authMiddleware, isAdmin, unBlockUserCtrl);

module.exports = router;
