const express = require("express");
const router = express.Router();
const Availabilities = require('../models/availabilities');

router.get("/", async (req, res) => {
    try {
        const data = await Availabilities.find();
        res.json(data);        
    } catch (err) {
        console.log(err);
    }
})
module.exports = router;