const verifyToken = require('./verifyToken')

const verifyTokenAndAdmin = (req, res, next) => {
    verifyToken(req, res, () => {
        if (req.user.id === req.params.id || req.user.admin) {
            next()
        } else {
            res.status(403).json('You can not to do that')
        }
    })
}

module.exports = verifyTokenAndAdmin
