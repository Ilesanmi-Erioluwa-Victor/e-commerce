const express = require("express");
const {
  createProductCtrl,
  getProductCtrl,
  getAllProductsCtrl,
  updateProductCtrl,
  deleteProductCtrl,
} = require("../controllers/productCtrl");

const router = express.Router();

router.route("/").post(createProductCtrl).get(getAllProductsCtrl);

router
  .route("/:id")
  .get(getProductCtrl)
  .put(updateProductCtrl)
  .delete(deleteProductCtrl);
module.exports = router;
