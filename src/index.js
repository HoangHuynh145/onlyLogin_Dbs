const express = require('express')
const cookieParser = require('cookie-parser')
const cors = require('cors')
const db = require('./config/db')
const router = require('./routes')
const app = express()

app.use(express.urlencoded({
    extended: true,
}))
app.use(cors({
    credentials: true, 
    origin: 'https://magnificent-queijadas-ad3ace.netlify.app/'
}));
app.use(cookieParser());
app.use(express.json());

// connect to db
db.connect()

// init route
router(app)
const port = process.env.PORT || 8000


app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})
