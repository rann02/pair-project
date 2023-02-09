const { Course, Category } = require('../models/index')
const timeFormating = require('../helpers/timeFormating')
const rupiah = require('../helpers/rupiah')

class Controller {
    static home(req, res) {
        Course.findAll()
            .then(courses => res.render)
    }

    static getCourse(req, res) {
        const {filter} = req.query
        let filterValues
        // Course.findAll()
        //     .then(data => {
        //         res.render('course', { data })
        //     })
        //     .catch(err => {
        //         res.send(err)
        //     })

        Category.findAll()
        .then(filterData => {
            // res.render('course', { filterData })
            filterValues = filterData
            return Course.filterCourse(filter)
        })
        
        .then(data => {
            res.render('course', { data, filterValues, timeFormating, rupiah })
            // res.send(data)
        })

        .catch(err => {
            res.send(err)
        })
    }
}

module.exports = Controller
