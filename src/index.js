const express = require('express')
const cookieParser = require('cookie-parser')
// const cors = require('cors')
const ios = require('socket.io');
const db = require('./config/db')
const router = require('./routes')
const app = express()

app.use(express.urlencoded({
    extended: true,
}))
app.use(cookieParser());
app.use(express.json());

// const whitelist = ['http://localhost:3000'];
// const corsOptions = {
//     credentials: true, // This is important.
//     origin: (origin, callback) => {
//         if (whitelist.includes(origin))
//             return callback(null, true)

//         callback(new Error('Not allowed by CORS'));
//     }
// }
// app.use(cors(corsOptions));

const io = new ios.Server({
    allowEIO3: true,
    cors: {
        origin: true,
        credentials: true
    },
})

// connect to db
db.connect()

// init route
router(io)
const port = process.env.PORT || 8000


io.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})
