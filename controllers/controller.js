const { Course, Category } = require('../models/index')

class Controller {
    static home(req, res) {
        Course.findAll()
            .then(courses => res.render('home', { courses }))
            .catch(err => res.send(err))
    }
}

module.exports = Controller
