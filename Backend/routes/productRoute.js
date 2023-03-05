const express = require("express");
const {
  createProductCtrl,
  getProductCtrl,
  getAllProductsCtrl,
} = require("../controllers/productCtrl");

const router = express.Router();

router.route("/").post(createProductCtrl).get(getAllProductsCtrl);

router.route("/:id").get(getProductCtrl);
module.exports = router;
