const Sequelize = require('sequelize'); 
const db = require('../server/connection');

// Schema de la tabla ps_clienttype
const ClientType = db.define('ps_clienttype', {
    idClientType: {
        type: Sequelize.INTEGER, 
        primaryKey: true, 
        autoIncrement: true
    },
    NameClientType: {
        type: Sequelize.STRING, 
        required: true, 
        allowNull: false
    }
}, {
    freezeTableName: true
})

module.exports = ClientType;