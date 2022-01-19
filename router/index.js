const productsRouter = require('./productsRouter')
const userRouter = require('./usersRouter')
const auth =  require('./auth')
const orderRouter = require('./ordersRouter')

function routerApi(app) {
    app.use('/api/products', productsRouter)
    app.use('/api/users', userRouter)
    app.use('/api', auth)
    app.use('/api/orders', orderRouter)
}

module.exports = routerApi