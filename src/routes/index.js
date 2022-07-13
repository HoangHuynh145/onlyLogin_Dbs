const authRoutes = require('./authRoute')
const userRoutes = require('./userRoute')

function route(app) {
    app.use('/v1/auth', authRoutes)
    app.use('/v1/user', userRoutes)
}

module.exports = route