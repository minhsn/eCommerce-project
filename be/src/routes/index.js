const authRouter = require('./auth')

function router (app) {

    app.use('/api/auth', authRouter)
    
}
module.exports = router