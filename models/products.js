const mongoose = require('mongoose')

const productsSchema = new mongoose.Schema({
    _id: {
        type: String,
        required: true
    },
    type: {
        type: String,
        required: true,
    },
    name: {
        type: String,
        required: true
    },
    color: [{
        type: Array,
        required: true
    }],
    price: {
        type: Number,
        required: true
    },
    manufacturer: {
        type: String,
        required: true
    },
    availability: {
        type: String,
    }
})

module.exports = mongoose.model('Products', productsSchema);