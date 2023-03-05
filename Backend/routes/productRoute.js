const express = require("express");
const {
  createProductCtrl,
  getProductCtrl,
} = require("../controllers/productCtrl");

const router = express.Router();

router.post("/", createProductCtrl);

router.route("/:id").get(getProductCtrl);
module.exports = router;
