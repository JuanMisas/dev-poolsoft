
const Sequelize = require('sequelize'); 
const db = require('../server/connection');

const FilterType = db.define('ps_filtertype', {
    idFilterType: {
        type: Sequelize.INTEGER, 
        primaryKey: true, 
        autoIncrement: true
    },
    NameFilterType: {
        type: Sequelize.STRING, 
        required: true, 
        allowNull: false
    }
}, {
    freezeTableName: true
})

module.exports = FilterType;