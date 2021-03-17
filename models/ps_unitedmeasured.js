const Sequelize = require('sequelize'); 
const db = require('../server/connection');

// Schema de la tabla ps_user
const UnitedMeasured = db.define('ps_unitedmeasured', {
    idUnitedMeasured: {
        type: Sequelize.INTEGER, 
        primaryKey: true, 
        autoIncrement: true
    },
    NameUnitedMeasured: {
        type: Sequelize.STRING, 
        required: true, 
        allowNull: false
    }
}, {
    freezeTableName: true
})

module.exports = UnitedMeasured;