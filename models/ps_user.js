const Sequelize = require('sequelize');
const db = require('../server/connection');

// Schema de la tabla ps_user
const User = db.define('ps_user', {
    NameUser: {
        type: Sequelize.STRING,
        primaryKey: true
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