
const Sequelize = require('sequelize'); 
const db = require('../server/connection');

const State = db.define('ps_state', {
    IdState: {
        type: Sequelize.INTEGER, 
        primaryKey: true, 
        autoIncrement: true
    },
    IdCountryState: {
        type: Sequelize.INTEGER,
        required: true, 
        allowNull: false
    },
    NameState: {
        type: Sequelize.STRING, 
        required: true, 
        allowNull: false
    }
}, {
    freezeTableName: true
})

module.exports = State;