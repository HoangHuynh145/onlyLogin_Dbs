const express = require('express')
const router = express.Router()
const siteController = require('../app/Controller/siteController')

router.get('/', siteController.start)

module.exports = router
