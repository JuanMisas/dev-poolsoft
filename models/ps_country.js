
const Sequelize = require('sequelize'); 
const db = require('../server/connection');

const Country = db.define('ps_country', {
    IdCountry: {
        type: Sequelize.INTEGER, 
        primaryKey: true, 
        autoIncrement: true
    },
    NameCountry: {
        type: Sequelize.STRING, 
        required: true, 
        allowNull: false
    }
}, {
    freezeTableName: true
})

module.exports = Country;