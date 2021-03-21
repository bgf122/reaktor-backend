const express = require("express");
const router = express.Router();
const Gloves = require("../models/products");
const { getProducts } = require("../service/getProducts");

router.get("/", (req, res) => {getProducts(req, res, Gloves, "gloves")});

module.exports = router;
