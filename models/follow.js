let mongoose = require('mongoose')

let followSchema = new mongoose.Schema({
    company: {
        type: String
    },
    username: {
        type: String
    }
})

let Follow = mongoose.model('Follow', followSchema)

module.exports = Follow