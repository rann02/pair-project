const express = require('express')
const router = express.Router()
const course = require('./course')
const login = require('./login')
const Controller = require('../controllers/controller')

router.get('/',Controller.gethome)
router.use(course)
router.use(login)

module.exports = router