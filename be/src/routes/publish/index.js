const express = require('express')
const router = express.Router()

router.post('/login', (req, res) => {
    
    let username = req.body.username
    let password = req.body.password

    // check database username, password

    return res.send('api login')
})

router.post('/register', (req, res) => {
    const username = req.body.username
    const password = req.body.password
    if (!username || !password ){
        return res.status(400).send({
            message: 'username or password is null'
        })
    }
    
    return res.send('api register'+ username +password)
})

router.get('/products', (req, res) => {

    let page = req.query.page;
    let limit = req.query.limit;
    return res.send(`${page} , ${limit}`)
})

router.get('/product')

module.exports = router