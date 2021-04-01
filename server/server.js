const express = require('express')
const path = require('path')
const PORT = process.env.PORT || 5000

var routes = require('./routes/routes.js')
var routesLogin = require('./routes/login.js')
var routesUser = require('./routes/user.js')
<<<<<<< Updated upstream
var routesPoolType = require('./routes/poolType.js')
var routesFilterType = require('./routes/filterType.js')
var routesPayType = require('./routes/payType.js')
var routesUnitedMeasured = require('./routes/unitedMeasured.js')
var routesSupplies = require('./routes/supplies.js')
var routesRole = require('./routes/role.js')
var routesIdClientType = require('./routes/idClientType.js')
var routesClientType = require('./routes/clientType.js')
=======
var routesPoolType = require('./routes/pooltype.js')
var routesFilterType = require('./routes/filtertype.js')
var routesPayType = require('./routes/paytype.js')
var routesCountry = require('./routes/Country.js')
var routesState = require('./routes/State.js')
var routesCity = require('./routes/City')
>>>>>>> Stashed changes

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
<<<<<<< Updated upstream
  .use(routesUnitedMeasured)
  .use(routesSupplies)
  .use(routesRole)
  .use(routesIdClientType)
  .use(routesClientType)
  .use(express.json())
=======
  .use(routesCountry)
  .use(routesState)
  .use(routesCity)
>>>>>>> Stashed changes
  .use(express.static(path.join(__dirname, 'public')))
  .set('views', path.join(__dirname, 'views'))
  .set('view engine', 'ejs')
  .listen(PORT, () => console.log(`Listening on ${ PORT }`))
