const Sequelize = require('sequelize');
const db = require('../server/connection');

// Schema de la tabla ps_supply
const Supply = db.define('ps_supply', {
    idSupply: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    NameSupply: {
        type: Sequelize.STRING,
        required: true,
        allowNull: false
    },
    IdUnitedMeasuredSupply: {
        type: Sequelize.INTEGER,
        required: true,
        allowNull: false
    },
    DescriptionSupply: {
        type: Sequelize.STRING,
        required: true,
        allowNull: false
    }
}, {
    freezeTableName: true
})

module.exports = Supply;