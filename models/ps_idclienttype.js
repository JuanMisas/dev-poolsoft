const Sequelize = require('sequelize'); 
const db = require('../server/connection');

// Schema de la tabla ps_idclienttype
const IdClientType = db.define('ps_idclienttype', {
    IdIdClientType: {
        type: Sequelize.INTEGER, 
        primaryKey: true, 
        autoIncrement: true
    },
    NameIdClientType: {
        type: Sequelize.STRING, 
        required: true, 
        allowNull: false
    }
}, {
    freezeTableName: true
})

module.exports = IdClientType;