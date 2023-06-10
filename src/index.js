const express = require('express')
const bodyParser = require('body-parser')
const dotenv = require('dotenv')
const route = require('./route/route')
const { default: mongoose } = require('mongoose')

const app = express()
dotenv.config()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))

mongoose.connect(process.env.MONGO_URI)
.then( () => {
    console.log("MongoDB is Connected")
}).catch ( (err) => {
    console.log(err)
})

app.use('/', route)

app.listen(process.env.PORT, () => {
    console.log(`server is running on ${process.env.PORT}`)
})