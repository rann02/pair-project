const { Course, Category, User } = require('../models/index')
const timeFormating = require('../helpers/timeFormating')
const rupiah = require('../helpers/rupiah')

class Controller {
    static gethome(req, res) {
        res.render('home')
    }

    static getLogin(req, res) {
        res.render('login')
    }

    static getRegister(req, res) {
        res.render('register')
    }

    static postRegister(req, res) {
        const { userName, email, role, password } = req.body

        User.create({ userName, email, role, password })
            .then(() => {
                res.redirect('/courses')
            })
            .catch((err) => {
                res.send(err)
            })
    }

    static getLoginForm(req, res) {
        res.render('loginForm')
    }

    static getCourse(req, res) {
        const { filter } = req.query
        let filterValues

        Category.findAll()
            .then(filterData => {
                filterValues = filterData
                return Course.filterCourse(filter)
            })

            .then(data => {
                res.render('course', { data, filterValues, timeFormating, rupiah })
            })

            .catch(err => {
                res.send(err)
            })
    }

    static getTeacherCourse(req, res) {
        Course.findAll()
        .then(data => {
            res.render('teacherPageCourse', {data, timeFormating, rupiah})
        })
        .catch(err => {
            res.send(err)
        })
    }
    
    static getAddCourse(req, res) {
        Category.findAll()
        .then(data => {
            res.render('addCourse', {data})
        })
        .catch(err => {
            res.send(err)
        })
    }

    static posAddCourse(req, res) {
        const { name, duration, price, CategoryId, description } = req.body

        Course.create({name, duration, price, CategoryId, description})

        .then(() => {
            res.redirect('/courses/teacher')
        })
        .catch(err => {
            res.send(err)
        })
    }

    static postEditCourse(req, res) {
        const {id} = req.query
    }
}

module.exports = Controller
