const express = require('express')
const app = express()
const bodyParser = require('body-parser')
require('dotenv').config()

app.set('view engine', 'ejs')
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

app.use(express.static('static'))

require('./routing/index')(app)

app.use((err, req, res, _next) => {
    res.end('Problem...')
    console.log(err)
})

app.listen(3000, function () {
    console.log('Listening on :3000')
})
