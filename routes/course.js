const express = require('express')
const router = express.Router()
const Controller = require('../controllers/controller')

router.get('/', Controller.gethome)
router.get('/login', Controller.getLogin)
router.get('/login/register', Controller.getRegister)
router.post('/login/register', Controller.postRegister)
router.get('/login/profile', Controller.getProfile)
router.post('/login/profile', Controller.postProfile)
router.get('/login/form', Controller.getLoginForm)
router.post('/login/form', Controller.postLoginForm)



router.use((req, res, next) => {
  if (!req.session.userId) {
    const errors = "Please login"
    res.redirect(`/login/form?errors=${errors}`)
  } else {
    next()
  }
     
})


router.get('/cart', Controller.getCart)
router.get('/logout', Controller.getLogout)
router.get('/courses/teacher', Controller.getTeacherCourse)
router.get('/courses/teacher/add', Controller.getAddCourse)
router.post('/courses/teacher/add', Controller.posAddCourse)
router.get('/courses/teacher/edit/:id', Controller.getEditCourse)
router.post('/courses/teacher/edit/:id', Controller.postEditCourse)
router.get('/courses/teacher/delete/:id', Controller.deleteCourse)
router.get('/profile/detail/:id', Controller.getProfileDetail)
router.get('/courses/:id', Controller.getCourse)
router.get("/cart/:CourseId/:UserId", Controller.postCart)
router.post("/cart/:CourseId/:UserId", Controller.postCart)

module.exports = router