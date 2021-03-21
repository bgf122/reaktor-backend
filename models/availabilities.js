const mongoose = require('mongoose')

const availabilitiesSchema = new mongoose.Schema({
    _id: {
        type: String,
        required: true
    },
    availability: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model('Availabilities', availabilitiesSchema);