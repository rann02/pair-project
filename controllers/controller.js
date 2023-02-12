const { Course, Category, User, Cart, Profile } = require('../models/index')
const { Op } = require("sequelize");
const timeFormating = require('../helpers/timeFormating')
const rupiah = require('../helpers/rupiah')
const bcrypt = require('bcryptjs');

class Controller {
    static gethome(req, res) {
        res.render('home')
    }

    static getLogin(req, res) {
        res.render('login')
    }

    static getRegister(req, res) {
        const { errors } = req.query

        res.render('register', { errors })
    }

    static postRegister(req, res) {
        const { userName, email, role, password } = req.body

        User.create({ userName, email, role, password })

            .then(() => {
                res.redirect('/login/profile')
            })

            .catch((err) => {
                if (err.name === 'SequelizeValidationError') {
                    res.redirect(`/login/register?errors=${err.errors.map(el => {
                        return el.message
                    })}`)
                } else {
                    res.send(err)
                }
            })
    }

    static getProfile(req, res) {
        res.render('profile')
    }

    static postProfile(req, res) {
        const UserId = req.session.userId
        console.log(UserId);
        const {urlPhoto, phoneNumber, birth} = req.body

        Profile.create({urlPhoto, phoneNumber, birth, UserId})
        .then(()=>{
            res.redirect('/login/form')
        })
        .catch(err => {
            res.send(err)
        })
    }

    static getLoginForm(req, res) {
        const { errors } = req.query
        res.render('loginForm', { errors })
    }

    static postLoginForm(req, res) {
        const { userName, password} = req.body

        User.findOne({ where: { userName } })
            .then(user => {
                if (user) {
                    const isValid = bcrypt.compareSync(password, user.password)

                    if (isValid) {
                        req.session.userId = user.id

                        if (user.role === "Student") {
                            console.log("Muriddd");
                            return res.redirect(`/courses/${user.id}`)
                        } else if (user.role === "Teacher") {
                            console.log('GURUURURU');
                            return res.redirect('/courses/teacher')
                        }

                    } else {
                        // /login/form
                        const errors = "username or password error"
                        return res.redirect(`/login/form?errors=${errors}`)
                    }
                } else {
                    const errors = "username or password error"
                    return res.redirect(`/login/form?errors=${errors}`)
                }
            })

            .catch(err => {
                res.send(err)
            })
    }

    static getCourse(req, res) {
        const id = req.session.userId
        const { filter } = req.query

        let filterValues

        Category.findAll()
            .then(filterData => {
                filterValues = filterData
                return Course.filterCourse(filter)
            })

            .then(data => {
                res.render('course', { data, filterValues, timeFormating, rupiah, id })
            })

            .catch(err => {
                res.send(err)
            })
    }

    static getProfileDetail(req, res) {
        const { id } = req.params

        Profile.findAll({
            include: {
                model: User 
                // where: {
                //     id:id
                // }
            }
        })
        .then(data => {
            res.send(data)
        })
        .catch(err => {
            res.send(err)
        })
    }

    static getTeacherCourse(req, res) {
        const { name, search } = req.query
        let searchquery = {}

        if (search) {
            searchquery.where = {
                name: {
                    [Op.iLike]: `%${search}%`
                }
            }
        }

        Course.findAll(searchquery)

            .then(data => {
                res.render('teacherPageCourse', { data, timeFormating, rupiah, name })
            })

            .catch(err => {
                res.send(err)
            })
    }

    static getAddCourse(req, res) {
        const { errors } = req.query
        Category.findAll()

            .then(data => {
                res.render('addCourse', { data, errors })
            })

            .catch(err => {
                res.send(err)
            })
    }

    static posAddCourse(req, res) {
        const { name, duration, price, CategoryId, description } = req.body

        Course.create({ name, duration, price, CategoryId, description })

            .then(() => {
                res.redirect('/courses/teacher')
            })

            .catch(err => {
                if (err.name === 'SequelizeValidationError') {
                    res.redirect(`/courses/teacher/add?errors=${err.errors.map(el => {
                        return el.message
                    })}`)
                } else {
                    res.send(err)
                }
            })
    }

    static getEditCourse(req, res) {
        const { id } = req.params
        const { errors } = req.query
        let category

        Category.findAll()
            .then(result => {
                category = result
                return Course.findByPk(id)
            })

            .then(course => {
                // console.log(course);
                res.render('editCourse', { data: category, course, errors })
            })

            .catch(err => {
                res.send(err)
            })
    }

    static postEditCourse(req, res) {
        const { id } = req.params
        const { name, duration, price, CategoryId, description } = req.body

        Course.update({ name, duration, price, CategoryId, description }, {
            where: {
                id: id
            }
        })

            .then(() => {
                res.redirect('/courses/teacher')
            })
            .catch(err => {
                if (err.name === 'SequelizeValidationError') {
                    res.redirect(`/courses/teacher/edit/${id}?errors=${err.errors.map(el => {
                        return el.message
                    })}`)
                } else {
                    res.send(err)
                }
            })
    }

    static deleteCourse(req, res) {
        const { id } = req.params
        let deletedData

        Course.findByPk(id)

            .then(data => {
                deletedData = data
                return Course.destroy({
                    where: {
                        id: id
                    }
                })
            })

            .then(() => {
                res.redirect(`/courses/teacher?name=${deletedData.name}`)
            })

            .catch(err => {
                res.send(err)
            })
    }

    static postCart(req, res) {
        const { CourseId, UserId } = req.params

        Course.findByPk(CourseId)
            .then(data => {
                let totalPrice = data.price
                let nameCourse = data.name
                let quantity = 1
                return Cart.create({ CourseId, UserId, totalPrice, quantity, nameCourse })
            })
            .then(data => {
                res.redirect(`/courses/${UserId}`)
            })
            .catch(err => {
                res.send(err)
            })
    }

    static getCart(req, res) {
        const UserId = req.session.userId
        let resultFindAll
        Cart.findAll({
            where: {
                UserId,
            }
        })

            .then(data => {
                resultFindAll = data
                return Cart.sum('totalPrice', {
                    where: { 'UserId': UserId }
                })
            })
            .then(priceTotal => {
                res.render("cart",{data:resultFindAll, priceTotal, rupiah, UserId})
            })
            .catch(err => {
                res.send(err)
            })
    }

    static getLogout(req, res) {
        req.session.destroy(err => {
            if (err) {
                res.send(err)
            } else {
                res.redirect('/login/form')
            }
        })
    }


}

module.exports = Controller
