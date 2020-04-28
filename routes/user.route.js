const express = require('express')
const router = express.Router()
const shortid = require('shortid')

const db = require('../db')

router.get('/',(req, res)=> res.render('users/index',{
    users: db.get('users').value()
}))

router.get('/users/search', (req,res)=>{
    const q = req.query.q
    const matchedUsers = db.get('users').value().filter(function(user){
        return user.name.toLowerCase().indexOf(q.toLowerCase()) !== -1
    })
    res.render('users/index', {
        users: matchedUsers,
        q: q
    })
})

router.get('/create', (req,res) => res.render('users/create'))

router.get('/create/:id',(req,res)=> {
    const id = req.params.id
    const matchedUser = db.get('users').find({id: id}).value()
    res.render('users/view', {
        user:matchedUser
    })
})

router.post('/create', (req,res) => {
    req.body.id = shortid.generate();
    db.get('users').push(req.body).write();
    res.redirect('/users')
})

module.exports = router
