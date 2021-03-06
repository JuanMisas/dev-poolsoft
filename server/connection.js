const { Sequelize } = require('sequelize');

// Conexión a la base de datos usarndo Sequelize.
const sequelize = new Sequelize('heroku_37591f656c80936', 'b4c6349cf12db7', '60a43e7d', {
    host: 'us-cdbr-east-03.cleardb.com',
    dialect: 'mysql'
});

// Función que testea la conexión a la base de datos.
// Arroja un mensaje en consola dependiendo de los resultados de la conexión
async function testConnection() {
    try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
}

testConnection();

module.exports = sequelize;


// CONEXIÓN DE BASE DE DATOS USANDO mysql
// const mysql = require('mysql');
// const db = mysql.createConnection({
//     host        :   'us-cdbr-east-03.cleardb.com',
//     user        :   'b4c6349cf12db7',
//     password    :   '60a43e7d',
//     database    :   'heroku_37591f656c80936'
// });

// db.connect((err) => {
//     if(err) {
//         throw err;
//     }
//     console.log('MySQL Connected ...');
// });