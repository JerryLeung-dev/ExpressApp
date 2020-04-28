const express = require('express')

const port = 3000
const shortid = require('shortid')

const app = express()
const userRoute = require('./routes/user.route')

app.set('view engine', 'pug')
app.set('views', './views')

app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded
app.use('/users',userRoute)

app.get('/', function (req, res) {
    res.render('index')
  })


app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`))