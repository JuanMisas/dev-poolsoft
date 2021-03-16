const Sequelize = require('sequelize'); 
const db = require('../server/connection');

const Role = sequelize.define('ps_role', {
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
})

module.exports = Role;