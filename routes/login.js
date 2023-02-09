const express = require('express')
const router = express.Router()
const Controller = require('../controllers/controller')

router.get('/login', Controller.getLogin)
router.get('/login/register', Controller.getRegister)
router.post('/login/register', Controller.postRegister)
router.get('/login/form', Controller.getLoginForm)

module.exports = router