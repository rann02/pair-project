const express = require('express')
const router = express.Router()
const course = require('./course')

router.get('/', (req, res) => res.render('home.ejs'))
router.use(course)

module.exports = router