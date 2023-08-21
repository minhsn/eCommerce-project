const express = require('express')
const cors = require('cors')
const router = require('./src/routes')
const bodyParser = require('body-parser');
const morgan = require('morgan')
require('dotenv').config()

const app = express()
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors({
    origin : process.env.CLIENT_URL,
    methods : ['GET', 'POST', 'PUT', 'DELETE']
}))

app.use(morgan('combined'))

app.use(express.json())
app.use(express.urlencoded({extended : true}))

router(app)

const PORT = process.env.PORT || 8888

const listener = app.listen(PORT, () => {
    console.log(`server run on port : ${listener.address().port}`)
})