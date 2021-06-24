const Sequelize = require('sequelize');
const User = require('../models/ps_user');
const Role = require('../controllers/roleController');
const { QueryTypes } = require('sequelize');
const server = require('../server/server');
const { sequelize } = require('../models/ps_user')


module.exports = {

    async validateUser(tipo, name, body) {

        err = [];

        if (tipo == 'find_one') {

            if (name == undefined || body.NameUser == "") {
                err.push('El nombre de usuario no puede ser nulo.');
            }
            if (!(await this.existsNameUser(name))) {
                err.push('El Usuario no existe.');
            }
            return err;

        } else if (tipo == 'find_all') {

            return err;

        } else if (tipo == 'create') {

            if (body.NameUser == null || body.NameUser == "") {
                err.push('El nombre de usuario no puede ser vacío.');
            }
            if (await this.existsNameUser(body.NameUser)) {
                err.push('El nombre de usuario ya existe.');
            }
            if (body.PasswordUser == null || body.PasswordUser == "") {
                err.push('El Password no puede ser vacío.');
            }
            if (!await Role.existsIdRole(body.RoleUser)) {
                err.push('El Role no existe');
            }
            return err;

        } else if (tipo == 'update') {

            if (!(await this.existsNameUser(name))) {
                err.push('El Usuario no existe.');
            }
            if (body.NameUser == null || body.NameUser == "") {
                err.push('El nombre no puede ser vacío.');
            }
            if (body.PasswordUser == null || body.PasswordUser == "") {
                err.push('El Password no puede ser vacío.');
            }
            if (!(await Role.existsIdRole(body.RoleUser))) {
                err.push('El Role no existe.');
            }
            console.log('Fin de valide')
            return err;

        } else if (tipo == 'delete') {

            if (name == null || name == "") {
                err.push('El nombre no puede ser vacío.');
            }
            if (!(await this.existsNameUser(name))) {
                err.push('El Usuario no existe.');
            }
            return err;

        }
    },

    /* Método que crea un usuario dados el NameUser, PasswordUser, RoleUser */
    async createUser(body) {
        const err = await this.validateUser('create', 0, body);
        if (err.length > 0)
            throw err;
        const user = await User.create(body);
        return user;
    },

    /* Método que encuentra a un usuario por el idUser. */
    /* Devuelve un objeto json de tipo User. */
    async findUserById(name) {
        const err = await this.validateUser('find_one', name, {});
        if (err.length > 0)
            throw err;
        const user = await User.findByPk(name);
        return user;
    },

    /* Método que encuentra a todos los registros de User. */
    /* Devuelve un array de objetos json de tipo User. */
    async findAllUser() {
        const user = await User.findAll({ where: {} });
        return user;
    },

    /* Actualizar datos de un usuario dado el idUser */
    async updateUser(name, body) {
        const err = await this.validateUser('update', name, body);
        if (err.length > 0)
            throw err;

        const user = await User.update(body, { where: { NameUser: name } });
        if (user[0] == 1) {
            return true;
        }
    },

    /* Método que elimina un usuario dado el idUser */
    async deleteUser(name) {
        const err = await this.validateUser('delete', name, {});
        if (err.length > 0)
            throw err;
        const user = await User.destroy({ where: { NameUser: name } });
        if (user == 1)
            return true;
    },

    //  ===========================
    //  ======= Q U E R Y S =======
    //  ===========================

    /** Devuelve true si lo encuentra, sino devuelve false */
    async existsNameUser(name) {
        aux = await User.findByPk(name).catch(function() {
            console.log("Promise Rejected");
        });
        if (aux == null) {
            return false;
        } else {
            return true;
        }
    },

    async findAllUsersRole() {
        const usersAll = await sequelize.query(
            "select a.NameUser, a.PasswordUser, b.idRole, b.RoleName from ps_user a inner join ps_role b on a.RoleUser = b.idRole", 
            {
                raw: true,
                type: QueryTypes.SELECT
            });
        return usersAll;
    }

};