const Sequelize = require('sequelize');
const Role = require('../models/ps_role');
const server = require('../server/server');

module.exports = {

    async validateRole(tipo, id, body) {
        err = [];
        if (tipo == 'find_one') {
    
            if (id == undefined) {
                err.push('El ID del rol no puede ser nulo.');
            }
            if (!(await this.existsIdRole(id))) {
                err.push('El rol no existe.');
            }
            return err;

        } else if (tipo == 'find_all') {
            return err;
  
        } else if (tipo == 'create') {
            if (body.idRole) {
                if (await this.existsIdRole(body.idRole)) {
                    err.push('El rol ya existe.');
                }
            }
            if (body.RoleName == null || body.RoleName == "") {
                err.push('El nombre no puede ser vacío.');
            }
            return err;
    
        } else if (tipo == 'update') {
            if (id == undefined) {
                err.push('El ID del rol no puede ser nulo.');
            }
            if (!(await this.existsIdRole(id))) {
                err.push('El rol no existe.');
            }
            if (body.RoleName == null || body.RoleName == "") {
                err.push('El nombre no puede ser vacío.');
            }
            return err;
    
        } else if (tipo == 'delete') {
    
            if (id == undefined) {
                err.push('El ID del rol no puede ser nulo.');
            }
            if (!(await this.existsIdRole(id))) {
                err.push('El Id del rol No existe.');
            }
            return err;
    
        }
    },


    /* Método que encuentra a un rol por el idRole. */
    /* Devuelve un objeto json de tipo Role. */
    async findRoleById(id) {
        const err = await this.validateRole('find_one', id, {});
        if (err.length > 0 )
            throw err;
        const role = await Role.findByPk(id);
        return role;
    },

    /* Método que encuentra a todos los registros de Role. */
    /* Devuelve un array de objetos json de tipo Role. */
    async findAllRole() {
        const role = await Role.findAll({ where: {} });
        return role;
    },

    /* Actualizar datos de un rol dado el idRole */
    async updateRole(id, body) {
        const err = await this.validateRole('update', id, body);
        if (err.length > 0)
            throw err;

        body.idRole = id;
        const role = await Role.update(body, { where: { idRole : id } });
        if (role[0] == 1) {
            return true;
        }
    },

    /* Método que crea un Rol dados el RoleName */
    async createRole(body) {
        const err = await this.validateRole('create', 0, body);
        if (err.length > 0)
            throw err;
        const role = await Role.create(body);
        return role;
    },
    
    /* Método que elimina un rol dado el idRole */
    async deleteRole(id) {
        const err = await this.validateRole('delete', id, {});
        if (err.length > 0)
            return err;
        const role = await Role.destroy({ where: { idRole: id } });
        if (role == 1)
            return true;
    },

    //  ===========================
    //  ======= Q U E R Y S =======
    //  ===========================

    /** Devuelve true si lo encuentra, sino devuelve false */
    async existsIdRole(id) {
        aux = await Role.findByPk(id).catch(function() {
            console.log("Promise Rejected");
        });
        if (aux == null) {
            return false;
        } else {
            return true;
        }
    }

};