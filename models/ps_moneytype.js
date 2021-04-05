
const Sequelize = require('sequelize'); 
const db = require('../server/connection');

const MoneyType = db.define('ps_typemoney', {
    idTypeMoney: {
        type: Sequelize.INTEGER, 
        primaryKey: true, 
        autoIncrement: true
    },
    NameTypeMoney: {
        type: Sequelize.STRING, 
        required: true, 
        allowNull: false
    }
}, {
    freezeTableName: true
})

module.exports = MoneyType;