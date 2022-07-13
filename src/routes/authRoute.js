const express = require('express')
const router = express.Router()
const authController = require('../app/Controller/authController')
const verifyToken = require('../app/Middleware/verifyToken')

router.post('/register', authController.registerUser)
router.post('/login', authController.loginUser)
router.post('/refresh', authController.refreshUser)
router.post('/logout', verifyToken, authController.logoutUser)
router.get('/test', authController.test)
module.exports = router
