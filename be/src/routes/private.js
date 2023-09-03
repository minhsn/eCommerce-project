const express = require('express')
const router = express.Router()
const privateController = require('../controllers/private')

router.post('/products', privateController.postProducts)
router.delete('/products/:productId', privateController.deleteProduct)

module.exports = router