const express = require('express')
const router = express.Router()

router.post('/products', (req, res) => {

    let page = req.query.page;
    let limit = req.query.limit;
    return res.send(`${page} , ${limit}`)
})

router.get('/', (req, res) => {
    return res.send('private router')
})

module.exports = router