const express = require('express')
const axios = require('axios')
const userControllers = require('./database/controllers/userControllers')
const shopsControllers = require('./database/controllers/shopsControllers')
const cors = require('cors')

const routes = express()

routes.all(cors())

routes.use(express.Router())

routes.post('/getUser', userControllers.index)
routes.post('/createUser', userControllers.create)
routes.get('/getUsers', userControllers.all)
routes.get('/teste', userControllers.teste)

routes.post('/createShops', shopsControllers.create)
routes.get('/getShops', shopsControllers.index)
routes.post('/generateToken', shopsControllers.generate)
routes.put('/updateToken', shopsControllers.update)
routes.get('/getNotification', shopsControllers.notification)

module.exports = routes