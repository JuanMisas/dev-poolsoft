
const Sequelize = require('sequelize'); 
const db = require('../server/connection');

const PoolCustomer = db.define('ps_poolscustomers', {
    idPoolsCustomers: {
        type: Sequelize.INTEGER, 
        primaryKey: true, 
        autoIncrement: true
    },
    IdCustomer: {
        type: Sequelize.INTEGER, 
        required: true, 
        allowNull: false
    },
    DescriptionsPoolsCustomers: {
        type: Sequelize.STRING, 
        required: true, 
        allowNull: false
    },
    TypePoolsCustomers: {
        type : Sequelize.INTEGER,
        required: true, 
        allowNull: false
    },

    WidthPoolsCustomer : {
        type : Sequelize.DECIMAL,
        required: true, 
        allowNull: false
    } ,
    LargePoolsCustomers : {
        type : Sequelize.DECIMAL,
        required: true, 
        allowNull: false
    },
    DeepMinPoolsCustomers : {
        type : Sequelize.DECIMAL,
        required: true, 
        allowNull: false
    },
    DeepMaxCustomers : {
        type : Sequelize.DECIMAL,
        required: true, 
        allowNull: false
    },
    UMPoolsCustomers : {
        type : Sequelize.INTEGER,
        required: true, 
        allowNull: false
    },
    CubicPoolsCustomers : {
        type : Sequelize.DECIMAL,
        required: true, 
        allowNull: false
    },
    UMCubicPoolsCustomers : {
        type : Sequelize.INTEGER,
        required: true, 
        allowNull: false
    },
    FormPoolsCustomers : {
        type : Sequelize.STRING,
        required: true, 
        allowNull: false
    },
    TypeFilterCustomers : {
        type : Sequelize.INTEGER,
        required: true, 
        allowNull: false
    },
    NumFilterPoolsCustomers : {
        type : Sequelize.INTEGER,
        required: true, 
        allowNull: false
    },
    Frequencypoolscustomers : {
        type : Sequelize.INTEGER,
        required: true, 
        allowNull: false
    },
    WhenFrequencyPoolsCustomers : {
        type : Sequelize.SMALLINT,
        required: true, 
        allowNull: false
    },
    CommentsPoolsCustomers : {
        type : Sequelize.TEXT,
        required: false, 
        allowNull: true
    }
}, {
    freezeTableName: true
})

module.exports = PoolCustomer;