const express = require('express')
const router = express.Router()
const course = require('./course')


router.use(course)


module.exports = router