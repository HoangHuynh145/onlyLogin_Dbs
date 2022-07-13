const express = require('express')
const cookieParser = require('cookie-parser')
const cors = require('cors')
const db = require('./config/db')
const router = require('./routes')
const app = express()

app.use(express.urlencoded({
    extended: true,
}))
app.use(cookieParser());
app.use(express.json());

const whitelist = ['http://localhost:3000'];
const corsOptions = {
    credentials: true, // This is important.
    origin: (origin, callback) => {
        if (whitelist.includes(origin))
            return callback(null, true)

        callback(new Error('Not allowed by CORS'));
    }
}
app.use(cors(corsOptions));

// connect to db
db.connect()

// init route
router(app)
const port = process.env.PORT || 8000


app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})
