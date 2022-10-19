let mongoose = require('mongoose')

let reviewSchema = new mongoose.Schema({
    company: {
        type: String
    },
    username: {
        type: String
    },
    review: {
        type: String
    }
})

let Review = mongoose.model('Review', reviewSchema)

module.exports = Review