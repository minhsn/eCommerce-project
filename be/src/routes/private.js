const express = require('express')
const router = express.Router()
const privateController = require('../controllers/private')
const authController = require('../controllers/auth')

router.post('/products', authController.checkLogin, privateController.postProducts)
router.delete('/products/:productId', authController.checkLogin, privateController.deleteProduct)

module.exports = router