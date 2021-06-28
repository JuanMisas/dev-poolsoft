const Sequelize = require('sequelize');
const db = require('../server/connection');

// Schema de la tabla ps_customertype
const CustomerType = db.define('ps_customertype', {
    idCustomerType: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    NameCustomerType: {
        type: Sequelize.STRING,
        required: true,
        allowNull: false
    }
}, {
    freezeTableName: true
})

module.exports = CustomerType;