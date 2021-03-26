
const Sequelize = require('sequelize'); 
const db = require('../server/connection');

const PayType = db.define('ps_filtertype', {
    idPayType: {
        type: Sequelize.INTEGER, 
        primaryKey: true, 
        autoIncrement: true
    },
    NamePayType: {
        type: Sequelize.STRING, 
        required: true, 
        allowNull: false
    },
    PeriodicityPayType: {
        type: Sequelize.INTEGER, 
        required: true, 
        allowNull: false,
        defaultValue : 0
    }
}, {
    freezeTableName: true
})

module.exports = PayType;