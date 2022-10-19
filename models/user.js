let mongoose = require('mongoose')

let userSchema = new mongoose.Schema({
    username: {
        type: String
    },
    password: {
        type: String
    }
})

let User = mongoose.model('User', userSchema)

module.exports = User
