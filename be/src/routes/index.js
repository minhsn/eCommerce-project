const authRouter = require('./auth')
const publicRouter = require('./public')
const privateRouter = require('./private')

function router (app) {

    app.use('/api/auth', authRouter)
    app.use('/api/public', publicRouter)
    app.use('/api/private', privateRouter)
    
}
module.exports = router