const express = require('express')
const router = express.Router()
const privateController = require('../controllers/private')
const authController = require('../controllers/auth')
const multer = require('multer')


const upload = multer({ dest: 'upload/' })

router.post('/products',
    upload.single('image'), 
    authController.checkLogin, 
    privateController.postProducts)
router.delete('/products/:productId', 
    authController.checkLogin, 
    privateController.deleteProduct)

router.post('/comment', 
    // authController.checkLoginNormal,
    privateController.postReview
)

router.get('/comment', 
    authController.checkLoginNormal,
    privateController.getReview
)

module.exports = router