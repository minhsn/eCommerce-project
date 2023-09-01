const express = require('express')
const router = express.Router()
const privateController = require('../controllers/private')

router.post('/products', privateController.postProducts)

module.exports = router