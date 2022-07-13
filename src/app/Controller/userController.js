const User = require('../Model/User')

class UserController {

    // [GET] /v1/user/:id
    getAllUser = async (req, res, next) => {
        try {
            User.find({})
                .then(users => res.status(200).json(users))
                .catch(err => res.status(403).json(err))
        } catch (error) {
            res.status(404).json(error)
        }
    }

    // [DELETE] /v1/user/:id
    deleteUser = async (req, res, next) => {
        try {
            User.findById(req.params.id)
                .then(user => res.status(200).json('Delete successfully'))
                .catch(err => res.status(403).json(err))
        } catch (error) {
            res.status(403).json(error)
        }
    }

}

module.exports = new UserController
