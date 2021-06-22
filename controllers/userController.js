const Sequelize = require('sequelize');
const User = require('../models/ps_user');
const Role = require('../controllers/roleController');
const { QueryTypes } = require('sequelize');
const server = require('../server/server');
const { sequelize } = require('../models/ps_user')


module.exports = {

    async validateUser(tipo, id, body) {

        err = [];

        if (tipo == 'find_one') {
    
            if (id == undefined) {
                err.push('El ID del usuario no puede ser nulo.');
            }
            if (!(await this.existsIdUser(id))) {
                err.push('El Usuario no existe.');
            }
            return err;
    
        } else if (tipo == 'find_all') {
    
            return err;
    
        } else if (tipo == 'create') {
            if (body.idUser) {
                if (await this.existsIdUser(body.idUser)) {
                    err.push('El Usuario ya existe.');
                }
            }
            if (body.NameUser == null || body.NameUser == "") {
                err.push('El nombre no puede ser vacío.');
            }
            if (body.PasswordUser == null || body.PasswordUser == "") {
                err.push('El Password no puede ser vacío.');
            }

            if (!await Role.existsIdRole(body.RoleUser)){
                err.push('El Role no existe');
            }
            return err;
    
        } else if (tipo == 'update') {
            if (id == undefined) {
                err.push('El ID del usuario no puede ser nulo.');
            }
            if (!(await this.existsIdUser(id))) {
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
    
            if (id == undefined) {
                err.push('El ID del Usuario no puede ser nulo.');
            }
            if (!(await this.existsIdUser(id))) {
                err.push('El Id del Usurio No existe.');
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
    async findUserById(id) {
        const err = await this.validateUser('find_one', id, {});
        if (err.length > 0 )
            throw err;
        const user = await User.findByPk(id);
        return user;
    },

    /* Método que encuentra a todos los registros de User. */
    /* Devuelve un array de objetos json de tipo User. */
    async findAllUser() {
        const user = await User.findAll({ where: {} });
        return user;
    },

    /* Actualizar datos de un usuario dado el idUser */
    async updateUser(id, body) {
        const err = await this.validateUser('update', id, body);
        console.log(err.length)
        if (err.length > 0)
            throw err;
        console.log(body)
        body.idUser = id;
        const user = await User.update(body, { where: { idUser: id } });
        if (user[0] == 1) {
            return true;
        }
    },

    /* Método que elimina un usuario dado el idUser */
    async deleteUser(id) {
        const err = await this.validateUser('delete', id, {});
        if (err.length > 0)
            return err;
        const user = await User.destroy({ where: { idUser: id } });
        if (user == 1)
            return true;
    },

    /* Método que encuentra a un usuario por el username y el password. */
    /* Devuelve un objeto json de tipo User. */
    async findUser(username, password) {
        const user = await User.findOne({ where: { NameUser: username, PasswordUser: password } });
        return user;
    },

    //  ===========================
    //  ======= Q U E R Y S =======
    //  ===========================

    /** Devuelve true si lo encuentra, sino devuelve false */
    async existsIdUser(id) {
        aux = await User.findByPk(id).catch(function() {
            console.log("Promise Rejected");
        });
        if (aux == null) {
            return false;
        } else {
            return true;
        }
    }

};