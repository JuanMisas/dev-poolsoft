const Sequelize = require('sequelize'); 
const db = require('../server/connection');

// Schema de la tabla ps_user
const User = db.define('ps_user', {
    idUser: {
        type: Sequelize.INTEGER, 
        primaryKey: true, 
        autoIncrement: true
    },
    NameUser: {
        type: Sequelize.STRING, 
        required: true, 
        allowNull: false
    },
    PasswordUser: {
        type: Sequelize.STRING, 
        required: true, 
        allowNull: false
    },
    RoleUser: {
        type: Sequelize.INTEGER, 
        required: true, 
        allowNull: false
    }
}, {
    freezeTableName: true
})

module.exports = User;