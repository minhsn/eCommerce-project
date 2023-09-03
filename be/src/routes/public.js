const express = require('express')
const router = express.Router()
const publicController = require('../controllers/public')

router.get('/products', publicController.getProducts)
router.get('/image', publicController.getImage)

module.exports = router