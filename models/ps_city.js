
const Sequelize = require('sequelize'); 
const db = require('../server/connection');

const City = db.define('ps_city', {
    IdCity: {
        type: Sequelize.INTEGER, 
        primaryKey: true, 
        autoIncrement: true
    },
    IdStateCity: {
        type: Sequelize.INTEGER,
        required: true, 
        allowNull: false
    },
    NameCity: {
        type: Sequelize.STRING, 
        required: true, 
        allowNull: false
    }
}, {
    freezeTableName: true
})

module.exports = City;