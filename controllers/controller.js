const { Course } = require('../models/index')

class Controller {
    static home(req, res) {
        Course.findAll()
            .then(courses => res.render)
    }
}