let mongoose = require('mongoose')

// let reviewSchema = new mongoose.Schema({
//     company: {
//         type: String
//     },
//     username: {
//         type: String
//     },
//     review: {
//         type: String
//     }
// })

let reviewSchema = new mongoose.Schema({
    company: {
        type: String
    },
    username: {
        type: String
    },
    workingHours: {
        type: String
    },
    compensation: {
        type: String
    },
    personnelDevelopment: {
        type: String
    },
    workingAtmosphere: {
        type: String
    },
    leadershipAndManagement: {
        type: String
    },
    workingActivity: {
        type: String
    }
})

let Review = mongoose.model('Review', reviewSchema)

module.exports = Review