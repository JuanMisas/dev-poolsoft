const express = require('express')
const path = require('path')
const PORT = process.env.PORT || 5000

const bodyparser = require('body-parser')

const app = express()


app.use(express.json())
app.use(express.urlencoded({extended: true}))

var routes = require('./routes/routes.js')
var routesLogin = require('./routes/login.js')
var routesUser = require('./routes/user.js')
var routesPoolType = require('./routes/PoolType.js')

var mySqlConnection = require('./connection.js')



express()
  .use(routes)
  .use(routesLogin)
  .use(routesUser)
  .use(routesPoolType)
  .use(express.static(path.join(__dirname, 'public')))
  .set('views', path.join(__dirname, 'views'))
  .set('view engine', 'ejs')
  .listen(PORT, () => console.log(`Listening on ${ PORT }`))
