const Sequelize = require('sequelize');
const Role = require('../models/ps_role');
const server = require('../server/server');

module.exports = {
    /* Método que crea un Rol dados el RoleName */
    async createRole(roleName) {
        await Role.create({ RoleName: roleName });
    },

    /* Método que encuentra a un role por el rolename. */ 
    /* Devuelve un objeto json de tipo Role. */
    async findRole(roleName) {
        const role = await Role.findOne({ where: { RoleName: roleName } });
        return role;
    },

    /* Método que encuentra a un rol por el idRole. */ 
    /* Devuelve un objeto json de tipo Role. */
    async findRoleById(id) {
        const role = await Role.findByPk(id);
        return role;
    },

    /* Método que encuentra a todos los registros de Role. */ 
    /* Devuelve un array de objetos json de tipo Role. */
    async findAllRole() {
        const role = await Role.findAll({where : {}});
        return role;
    },

    /* Actualizar datos de un rol dado el idRole */
    async updateRole(id, roleName) {
        role = await Role.findByPk(id);
        if (role != null) {
            await Role.update({
                RoleName: roleName
            }, { 
                where : { idRole: id}
            }).catch(function () {
                console.log("Promise Rejected");
           });
        }
    },

    /* Método que elimina un rol dado el idRole */
    async deleteRole(id) {
        await Role.destroy({ where: { idRole: id } });
    }

};