const express = require("express");
const {
  createProductCtrl,
  getProductCtrl,
  getAllProductsCtrl,
  updateProductCtrl,
  deleteProductCtrl,
} = require("../controllers/productCtrl");
const { isAdmin, authMiddleware } = require("../middlewares/authMiddlware");

const router = express.Router();

router
  .route("/")
  .post(isAdmin, authMiddleware, createProductCtrl)
  .get(getAllProductsCtrl);

router
  .route("/:id")
  .get(getProductCtrl)
  .put(isAdmin, authMiddleware, updateProductCtrl)
  .delete(isAdmin, authMiddleware, deleteProductCtrl);
module.exports = router;
