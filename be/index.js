const express = require('express')
const cors = require('cors')
const router = require('./src/routes')
const bodyParser = require('body-parser');
const morgan = require('morgan')
const cookieParser = require('cookie-parser')
require('dotenv').config()

const app = express()

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors({
    credentials: true,
    origin: "http://localhost:3000"
}))

// cookieParser middleware
app.use(cookieParser())


app.use(morgan('combined'))

app.use(express.json())
app.use(express.urlencoded({extended : true}))

router(app)

const PORT = process.env.PORT || 8888

const listener = app.listen(PORT, () => {
    console.log(`server run on port : ${listener.address().port}`)
})