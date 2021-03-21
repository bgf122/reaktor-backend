const express = require("express");
const router = express.Router();
const Beanies = require('../models/products');
const { getProducts } = require("../service/getProducts");

router.get("/", (req, res) => {getProducts(req, res, Beanies, "beanies")});

module.exports = router;
