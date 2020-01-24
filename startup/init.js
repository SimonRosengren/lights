const errorHandler = require('../middleware/errorHandler')
const lightsRouter = require('../routes/lights') 
const authRouter = require('../routes/auth') 

module.exports = (app, express) => {

    app.use(express.json())
    //app.use('/', express.static('./client/build'))
    app.use('/api/auth', authRouter)
    app.use('/api/lights', lightsRouter)
    app.use(errorHandler)
}