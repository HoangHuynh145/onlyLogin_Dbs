const express = require('express')
const router = express.Router()
const userController = require('../app/Controller/userController')
const verifyToken = require('../app/Middleware/verifyToken')
const verifyTokenAndAdmin = require('../app/Middleware/verifyTokenAndAdmin')

router.get('/:id', verifyToken, userController.getAllUser)
router.delete('/:id', verifyTokenAndAdmin, userController.deleteUser)

module.exports = router
