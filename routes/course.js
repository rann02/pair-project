const express = require('express')
const router = express.Router()
const Controller = require('../controllers/controller')

router.get('/courses', Controller.getCourse)


module.exports = router