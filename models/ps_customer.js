const Sequelize = require('sequelize');
const db = require('../server/connection');

const customer = db.define('ps_customers', {
    idCustomer: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    NameCustomer: {
        type: Sequelize.STRING,
        required: true,
        allowNull: false
    },
    DateEnterCustomers: {
        type: Sequelize.DATEONLY,
        required: true,
        allowNull: false,
        defaultValue: Sequelize.DataTypes.NOW
    },
    TypePayCustomers: {
        type: Sequelize.INTEGER,
        required: true,
        allowNull: false
    },
    IdNumberCustomers: {
        type: Sequelize.STRING,
        required: true,
        allowNull: false,
        unique: true
    },
    IdClientTypeCustomers: {
        type: Sequelize.INTEGER,
        required: true,
        allowNull: false
    },
    StatusCustomers: {
        type: Sequelize.INTEGER,
        required: true,
        allowNull: false,
        defaultValue: 1
    },
    IdIdClientTypeCustomers: {
        type: Sequelize.INTEGER,
        required: true,
        allowNull: false
    },
    AddressBillCustomers: {
        type: Sequelize.STRING,
        required: true,
        allowNull: false
    },
    CountryBillCustomers: {
        type: Sequelize.INTEGER,
        required: true,
        allowNull: false
    },
    EstateBillcustomers: {
        type: Sequelize.INTEGER,
        required: true,
        allowNull: false
    },
    CityBillCustomers: {
        type: Sequelize.INTEGER,
        required: true,
        allowNull: false
    },
    FeeCustomers: {
        type: Sequelize.DECIMAL,
        required: true,
        allowNull: false,
        defaultValue: 0
    },
    IdTypeMoneycustomers: {
        type: Sequelize.INTEGER,
        required: true,
        allowNull: false
    },
    Phone1customer: {
        type: Sequelize.STRING,
        required: true,
        allowNull: false
    },
    Phone2customer: {
        type: Sequelize.STRING,
        required: false,
        allowNull: true
    },
    Phone3customer: {
        type: Sequelize.STRING,
        required: false,
        allowNull: true
    },
    Emailcustomer: {
        type: Sequelize.STRING,
        required: true,
        allowNull: false
    },
    CommentsCustomers: {
        type: Sequelize.TEXT,
        required: false,
        allowNull: true
    },
}, {
    freezeTableName: true
})

module.exports = customer;