const express = require('express')
const shortid= require('shortid')

const db = require('../db')

module.exports.index = (req, res)=> res.render('users/index',{
    users: db.get('users').value()
})

module.exports.search = (req,res)=>{
    console.log(req.body)
    const q = req.query.q
    const matchedUsers = db.get('users').value().filter(function(user){
        return user.name.toLowerCase().indexOf(q.toLowerCase()) !== -1
    })
    res.render('users/index', {
        users: matchedUsers,
        q: q
    })
}

module.exports.create =  (req,res) => res.render('users/create')

module.exports.view = (req,res)=> {
    const id = req.params.id
    const matchedUser = db.get('users').find({id: id}).value()
    res.render('users/view', {
        user:matchedUser
    })
}

module.exports.postCreate =(req,res) => {
    req.body.id = shortid.generate();
    db.get('users').push(req.body).write();
    res.redirect('/users')
}