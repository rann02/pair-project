const { Course, Category } = require('../models/index')

class Controller {
    static home(req, res) {
        Course.findAll()
            .then(courses => res.render)
    }

    static getCourse (req, res) {

    }
}

module.exports = Controller
