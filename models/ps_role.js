const Sequelize = require('sequelize'); 
const db = require('../server/connection');

// Schema de la tabla ps_role
const Role = db.define('ps_role', {
    idRole: {
        type: Sequelize.INTEGER,
        primaryKey: true, 
        autoIncrement: true
    },
    RoleName: {
        type: Sequelize.STRING, 
        required: true, 
        allowNull: false
    }
}, {
    freezeTableName: true
})

module.exports = Role;