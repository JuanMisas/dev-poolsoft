const express = require('express')
const path = require('path')
const PORT = process.env.PORT || 5000

var routes = require('./routes/routes.js')
var routesLogin = require('./routes/login.js')
var mySqlConnection = require('./connection.js')


// let normalizedPath = require('path').join(__dirname, "models")
//     require('fs').readdirSync(normalizedPath).forEach((file) => {
//         sequelize.import('./models/' + file)
//     })
//     let {User, Permissions} = sequelize.models



express()
  .use(routes)
  .use(routesLogin)
  .use(express.static(path.join(__dirname, 'public')))
  .set('views', path.join(__dirname, 'views'))
  .set('view engine', 'ejs')
  .listen(PORT, () => console.log(`Listening on ${ PORT }`))
