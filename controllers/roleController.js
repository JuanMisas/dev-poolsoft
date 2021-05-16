const Sequelize = require('sequelize');
const Role = require('../models/ps_role');
const server = require('../server/server');

module.exports = {

    async validateRole(body, id, tipo) {
        var errores = [];
        if (tipo == 1) {
            if (body.idRole == '' || body.idRole == undefined)
                errores.push('El ID no puede ser nulo');
            if (errores.length == 0) {
                var x1 = await Role.count({ where: { 'idRole': body.idRole } });
                if (x1 > 0)
                    errores.push('El ID ya existe');
            }
            if (body.RoleName == '' || body.RoleName == undefined)
                errores.push('El Nombre no puede ser nulo');
        }
        if (tipo == 2) {
            if (id == '' || id == undefined)
                errores.push('El ID no puede ser nulo');
            if (errores.length == 0) {
                var x1 = await Role.count({ where: { 'idRole': id } });
                if (x1 == 0)
                    errores.push('El ID No existe');
            }
        }
        if (tipo == 3) {
            if (id == '' || id == undefined)
                errores.push('El ID no puede ser nulo');
            if (errores.length == 0) {
                var x1 = await Role.count({ where: { 'idRole': id } });
                if (x1 == 0)
                    errores.push('El ID No existe');
            }
            if (body.RoleName == '' || body.RoleName == undefined)
                errores.push('El Nombre no puede ser nulo');
        }
        if (tipo == 4) {
            if (id == '' || id == undefined)
                errores.push('El ID no puede ser nulo');
            if (errores.length == 0) {
                var x1 = await Role.count({ where: { 'idRole': id } });
                if (x1 == 0)
                    errores.push('El ID No existe');
            }
        }
        const len = errores.length;
        if (len > 0)
            return errores;
        else
            return false;
    },

    /* Método que crea un Rol dados el RoleName */
    async createRole(body) {
        const err = await this.validateRole(body, 0, 1);
        if (err)
            return err;
        await Role.create(body);
    },

    /* Método que encuentra a un rol por el idRole. */
    /* Devuelve un objeto json de tipo Role. */
    async findRoleById(id) {
        const err = await this.validateRole(0, id, 2);
        if (err)
            return err;
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
    async updateRole(body, id) {
        const err = await this.validateRole(body, id, 3);
        if (err)
            return err;
        role = await Role.findByPk(id);
        if (role != null) {
            await Role.update({
                RoleName: body.RoleName
            }, {
                where: { idRole: id }
            }).catch(function() {
                console.log("Promise Rejected");
            });
        }
    },

    /* Método que elimina un rol dado el idRole */
    async deleteRole(id) {
        const err = await this.validateRole(0, id, 4);
        if (err)
            return err;
        await Role.destroy({ where: { idRole: id } });
    },

    /* Método que encuentra a un role por el rolename. */
    /* Devuelve un objeto json de tipo Role. */
    async findRole(roleName) {
        const role = await Role.findOne({ where: { RoleName: roleName } });
        return role;
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