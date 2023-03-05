const express = require("express");
const { createProductCtrl } = require("../controllers/productCtrl");

const router = express.Router();

router.post("/", createProductCtrl);
module.exports = router;
