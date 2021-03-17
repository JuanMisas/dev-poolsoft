const Sequelize = require('sequelize'); 
const db = require('../server/connection');

// Schema de la tabla ps_supplies
const Supplies = db.define('ps_supplies', {
    idSupplies: {
        type: Sequelize.INTEGER, 
        primaryKey: true, 
        autoIncrement: true
    },
    NameSupplies: {
        type: Sequelize.STRING, 
        required: true, 
        allowNull: false
    },
    IdUnitedMeasuredSupplies: {
        type: Sequelize.INTEGER,
        required: true, 
        allowNull: false
    },
    DescriptionSupplies: {
        type: Sequelize.STRING, 
        required: true, 
        allowNull: false
    }
}, {
    freezeTableName: true
})

module.exports = Supplies;