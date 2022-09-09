const authRoutes = require('./authRoute')
const userRoutes = require('./userRoute')
const siteRoutes = require('./siteRoute')

function route(app) {
    app.use('/v1/auth', authRoutes)
    app.use('/v1/user', userRoutes)

    app.use('/', siteRoutes)
}

module.exports = route