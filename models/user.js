let mongoose = require('mongoose')

let userSchema = new mongoose.Schema({
    username: {
        type: String
    },
    email: {
        type: String
    },
    password: {
        type: String
    }
})

let User = mongoose.model('User', userSchema)

module.exports = User
