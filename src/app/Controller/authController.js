const User = require('../Model/User')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv')

dotenv.config()

const generateAccessToken = (user) => {
    return (jwt.sign({
        id: user.id,
        admin: user.admin,
    }, process.env.JWT_ACCESS_KEY, { expiresIn: '10m' }))
}

const generateRefreshToken = (user) => {
    return (jwt.sign({
        id: user.id,
        admin: user.admin,
    }, process.env.JWT_REFRESH_KEY, { expiresIn: '365d' }))
}

let refreshTokens = []

class AuthController {

    //[GET] /v1/auth/test
    test(req, res, next) {
        res.send('test')
    }

    // [POST] /v1/auth/register
    registerUser = async (req, res, next) => {
        try {
            // hash password
            const salt = await bcrypt.genSalt(10);
            const hashed = await bcrypt.hash(req.body.password, salt);

            //Create new user
            const newUser = await new User({
                username: req.body.username,
                email: req.body.email,
                password: hashed,
            });
            //Save user to DB
            newUser.save()
                .then(user => res.status(200).json(user))
                .catch(next)
        } catch (err) {
            res.status(403).json(err);
        }
    }

    // [POST] /v1/auth/login
    loginUser = async (req, res, next) => {
        try {
            User.findOne({ username: req.body.username })
                .then(async (user) => {
                    if (!user) {
                        return res.status(403).json('User name is incorrect')
                    }
                    const validPassword = await bcrypt.compare(
                        req.body.password,
                        user.password
                    );
                    if (!validPassword) {
                        res.status(403).json('Password is incorrect')
                    }
                    if (user && validPassword) {
                        // add access token
                        const accessToken = generateAccessToken(user)
                        // add refresh token
                        const refreshToken = generateRefreshToken(user)
                        refreshTokens.push(refreshToken)
                        // add cookies
                        await res.cookie('refreshToken', refreshToken, {
                            httpOnly: true,
                            secure: true,
                            path: "/",
                            sameSite: "Strict"
                        })
                        console.log('Cookie added')
                        // tránh trả về password (._doc để parse)
                        const { password, ...others } = user._doc
                        res.status(200).json({ ...others, accessToken })
                    }
                })
                .catch(err => res.json(err))
        } catch (error) {
            console.log(error)
            res.status(403).json(error)
        }
    }

    //[POST] /v1/auth/refresh
    refreshUser = async (req, res, next) => {
        // lấy ra refresh token
        const refreshToken = req.cookies.refreshToken
        if (!refreshToken) {
            return res.status(403).json('You are not authenticated')
        }
        if (!refreshTokens.includes(refreshToken)) {
            return res.status(403).json('Token is not valid')
        }
        jwt.verify(refreshToken, process.env.JWT_REFRESH_KEY, (err, user) => {
            if (err) {
                console.log(err)
            } else {
                refreshTokens = refreshTokens.filter(token => token !== refreshToken)
                // tạo 1 accessToken và refreshToken mới
                const newAccessToken = generateAccessToken(user)
                const newRefreshToken = generateRefreshToken(user)
                // lưu refresh token mới vào cookie
                res.cookie('refreshToken', newRefreshToken, {
                    httpOnly: true,
                    secure: true,
                    path: "/",
                    sameSite: "Strict"
                })
                refreshTokens.push(newRefreshToken)
                return res.status(200).json({ accessToken: newAccessToken })
            }
        })
    }

    //[POST] /v1/auth/logout
    logoutUser(req, res, next) {
        res.clearCookie('refreshToken')
        refreshTokens = refreshTokens.filter(token => token !== req.cookies.refreshToken)
        return res.status(200).json({ message: 'Logout successful' })
    }
}

module.exports = new AuthController
