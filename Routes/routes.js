const router = require('express').Router()
const { v4: uuidv4 } = require('uuid')
const User = require('../models/user')
const Company = require('../models/company')
const Review = require('../models/review')
const Follow = require('../models/follow')

router.get('/', (req, res) => {
    res.render('index')
})

router.get('/signup', (req, res) => {
    res.render('signup')
})

router.get('/login', (req, res) => {
    res.render('login')
})

router.get('/dashboard', (req, res) => {
    res.render('dashboard')
})

router.get('/reviews', (req, res) => {
    res.render('reviews')
})

router.get('/feed', (req, res) => {
    res.render('feed')
})

router.post('/createUser', (req, res) => {
    let username = uuidv4()
    username = "user-" + username.split("-")[1]
    let password = req.body.password
    let data = {
        username,
        password
    }
    User.create(data, (err, user) => {
        if (err) {
            res.json({
                message: 'Error',
                err
            })
        } else {
            res.status(200).json({
                message: 'Success',
                user
            })
        }
    })
})

router.post('/getUser', (req, res) => {
    User.findOne(req.body, (err, user) => {
        if (err) {
            res.json({
                message: 'Error',
                err
            })
        } else {
            res.status(200).json({
                message: 'Success',
                user
            })
        }
    })
})

router.get('/getCompany/:id', (req, res) => {
    Company.findOne({ company: req.params.id }, (err, company) => {
        if (err) {
            res.json({
                message: 'Error',
                err
            })
        } else {
            res.status(200).json({
                message: 'Success',
                company
            })
        }
    })
})

router.get('/getCompanies', (req, res) => {
    Company.find({ }, (err, companies) => {
        if (err) {
            res.json({
                message: 'Error',
                err
            })
        } else {
            res.status(200).json({
                message: 'Success',
                companies
            })
        }
    })
})

router.get('/getReviews/:id', (req, res) => {
    Review.find({company:req.params.id }, (err, reviews) => {
        if (err) {
            res.json({
                message: 'Error',
                err
            })
        } else {
            res.status(200).json({
                message: 'Success',
                reviews
            })
        }
    })
})

router.post('/addReview', (req, res) => {
    Review.create(req.body, (err, review) => {
        if (err) {
            res.json({
                message: 'Error',
                err
            })
        } else {
            res.status(200).json({
                message: 'Success',
                review
            })
        }
    })
})

router.post('/follow', (req, res) => {
    Follow.create(req.body, (err, follow) => {
        if (err) {
            res.json({
                message: 'Error',
                err
            })
        } else {
            res.status(200).json({
                message: 'Success',
                follow
            })
        }
    })
})

router.get('/getFollow/:id', (req, res) => {
    let username = req.params.id.split("[")[0]
    let company = req.params.id.split("[")[1]
    Follow.find({ company, username }, (err, follow) => {
        if (err) {
            res.json({
                message: 'Error',
                err
            })
        } else {
            res.status(200).json({
                message: 'Success',
                follow
            })
        }
    })
})

router.get('/unfollow/:id', (req, res) => {
    Follow.findOneAndDelete({company:req.params.id }, (err, unfollow) => {
        if (err) {
            res.json({
                message: 'Error',
                err
            })
        } else {
            res.status(200).json({
                message: 'Success',
                unfollow
            })
        }
    })
})

router.get('/getFeed/:id', (req, res) => {
    let username = req.params.id
    Follow.find({ username }, (err, follow) => {
        if (err) {
            res.json({
                message: 'Error',
                err
            })
        } else {
            res.status(200).json({
                message: 'Success',
                follow
            })
        }
    })
})


// router.post('/createCompany', (req, res) => {
//     Company.create(req.body, (err, company) => {
//         if (err) {
//             res.json({
//                 message: 'Error',
//                 err
//             })
//         } else {
//             res.status(200).json({
//                 message: 'Success',
//                 company
//             })
//         }
//     })
// })

module.exports = router