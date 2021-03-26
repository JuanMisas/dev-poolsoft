const express = require('express')
const path = require('path')
const PORT = process.env.PORT || 5000

var routes = require('./routes/routes.js')
var routesLogin = require('./routes/login.js')
var routesUser = require('./routes/user.js')
var routesPoolType = require('./routes/pooltype.js')
var routesFilterType = require('./routes/filtertype.js')
var routesPayType = require('./routes/paytype.js')

var mySqlConnection = require('./connection.js')


express()
  .use(express.json())
  .use(express.urlencoded({extended: true}))
  .use(routes)
  .use(routesLogin)
  .use(routesUser)
  .use(routesPoolType)
  .use(routesFilterType)
  .use(routesPayType)
  .use(express.static(path.join(__dirname, 'public')))
  .set('views', path.join(__dirname, 'views'))
  .set('view engine', 'ejs')
  .listen(PORT, () => console.log(`Listening on ${ PORT }`))
