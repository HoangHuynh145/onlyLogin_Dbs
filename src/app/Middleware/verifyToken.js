const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

dotenv.config()

const verifyToken = (req, res, next) => {
    // mò trên hedear cái token
    const token = req.headers.token;
    if(token) {
        // lọc bearer ra khỏi token
        const accessToken = token.split(' ')[1]
        // chứng token
        jwt.verify(accessToken, process.env.JWT_ACCESS_KEY, (err, user) => {
            if(err) {
                res.status(403).json('Token is not valid')
            } else {
                req.user = user
                next()
            }
        })
    } else {
        res.status(403).json('You are not authenticated')
    }
}

module.exports = verifyToken
