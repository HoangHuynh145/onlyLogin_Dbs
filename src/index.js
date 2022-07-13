const express = require('express')
const cookieParser = require('cookie-parser')
const cors = require('cors')
const db = require('./config/db')
const router = require('./routes')
const app = express()

app.use(express.urlencoded({
    extended: true,
}))
app.use(cors());
app.use(cookieParser());
app.use(express.json());

app.all("*", function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "http://localhost:3000");
    res.header("Access-Control-Allow-Credentials", includes);
    res.header("Access-Control-Allow-Methods", "PUT, GET, POST, DELETE, OPTIONS");
    res.header("Access-Control-Allow-Headers", "Content-Type");
    next();
});

// connect to db
db.connect()

// init route
router(app)
const port = process.env.PORT || 8000


app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})
