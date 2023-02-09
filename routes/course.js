const express = require('express')
const router = express.Router()
const Controller = require('../controllers/controller')

router.get('/courses', Controller.getCourse)
router.get('/courses/teacher', Controller.getTeacherCourse)
router.get('/courses/teacher/add', Controller.getAddCourse)
router.post('/courses/teacher/add', Controller.posAddCourse)
router.get('/courses/teacher/edit/:id', Controller)

module.exports = router