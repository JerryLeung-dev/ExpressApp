const express = require('express')
const app = express()
const port = 3000
const shortid = require('shortid');
//database setting
const low = require('lowdb')
const FileSync = require('lowdb/adapters/FileSync')
//instance
const adapter = new FileSync('db.json')
const db = low(adapter)
// Set some defaults
db.defaults({ users:[] })
  .write()

app.set('view engine', 'pug')
app.set('views', './views')

app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded

app.get('/', function (req, res) {
    res.render('index')
  })

app.get('/users',(req, res)=> res.render('users/index',{
    users: db.get('users').value()
}))

app.get('/users/search', (req,res)=>{
    const q = req.query.q
    const matchedUsers = db.get('users').value().filter(function(user){
        return user.name.toLowerCase().indexOf(q.toLowerCase()) !== -1
    })
    res.render('users/index', {
        users: matchedUsers,
        q: q
    })
})

app.get('/users/create', (req,res) => res.render('users/create'))

app.get('/users/create/:id',(req,res)=> {
    const id = req.params.id
    const matchedUser = db.get('users').find({id: id}).value()
    res.render('users/view', {
        user:matchedUser
    })
})

app.post('/users/create', (req,res) => {
    req.body.id = shortid.generate();
    db.get('users').push(req.body).write();
    res.redirect('/users')
})

app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`))