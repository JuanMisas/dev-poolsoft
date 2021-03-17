
const Sequelize = require('sequelize'); 
const db = require('../server/connection');

const PoolType = db.define('ps_pooltype', {
    idTypePool: {
        type: Sequelize.INTEGER, 
        primaryKey: true, 
        autoIncrement: true
    },
    NameTypePool: {
        type: Sequelize.STRING, 
        required: true, 
        allowNull: false
    }
}, {
    freezeTableName: true
})

module.exports = PoolType;