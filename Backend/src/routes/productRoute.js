const express = require('express');
const {
  createProductCtrl,
  getProductCtrl,
  getAllProductsCtrl,
  updateProductCtrl,
  deleteProductCtrl,
} = require('../../controllers/productCtrl');
const { isAdmin, authMiddleware } = require('../../middlewares/authMiddlware');

const router = express.Router();

router
  .route('/')
  .post(authMiddleware, isAdmin, createProductCtrl)
  .get(getAllProductsCtrl);

router
  .route('/:id')
  .get(getProductCtrl)
  .put(authMiddleware, isAdmin, updateProductCtrl)
  .delete(authMiddleware, isAdmin, deleteProductCtrl);
module.exports = router;
