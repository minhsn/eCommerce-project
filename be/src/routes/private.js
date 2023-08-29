const express = require('express')
const router = express.Router()

router.post('/products', (req, res) => {
    return res.send('private')
})

module.exports = router