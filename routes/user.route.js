const express = require('express')
const router = express.Router()
const shortid = require('shortid')

const db = require('../db')
const controller = require('../controller/user.controller')

router.get('/',controller.index)

router.get('/search', controller.search)

router.get('/create', controller.create)

router.post('/create', controller.postCreate)

router.get('/:id', controller.get)



module.exports = router
