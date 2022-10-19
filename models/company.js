let mongoose = require('mongoose')

let companySchema = new mongoose.Schema({
    company: {
        type: String
    },
    industry: {
        type: String
    },
    country: {
        type: String
    }
})

let Company = mongoose.model('Company', companySchema)

module.exports = Company