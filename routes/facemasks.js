const express = require("express");
const Facemasks = require("../models/products");
const router = express.Router();
const { getProducts } = require("../service/getProducts");

router.get("/", (req, res) => {getProducts(req, res, Facemasks, "facemasks")});

module.exports = router;
