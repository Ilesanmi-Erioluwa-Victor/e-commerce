const express = require("express");
const {
  createProductCtrl,
  getProductCtrl,
  getAllProductsCtrl,
  updateProductCtrl,
} = require("../controllers/productCtrl");

const router = express.Router();

router.route("/").post(createProductCtrl).get(getAllProductsCtrl);

router.route("/:id").get(getProductCtrl).put(updateProductCtrl);
module.exports = router;
