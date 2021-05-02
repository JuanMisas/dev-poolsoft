const Sequelize = require('sequelize');
const User = require('../models/ps_user');
const Role = require('../models/ps_role');
const server = require('../server/server');

module.exports = {

    async validateUser(body, id, tipo){
        var errores = [];
        isRole = false;
        if (tipo == 1) {
            if (body.idUser =! undefined) {
                var x1 = await User.count({where : {'idUser' : body.idUser}});
                if (x1 > 0) 
                    errores.push('El ID ya existe');
            }
            if (body.NameUser == '' || body.NameUser == undefined)
                errores.push('El Nombre no puede ser nulo');
            if (body.PasswordUser == '' || body.PasswordUser == undefined)
                errores.push('La contraseña no puede ser nula');
            if (body.PasswordUser.length < 8)
                errores.push('La contraseña debe tener al menos 8 caracteres');
            if (body.RoleUser == '' || body.RoleUser == undefined)
                errores.push('El Rol no puede ser nulo');
                isRole = true;
            if (isRole) {
                var x1 = await Role.count({where : {'idRole' : body.RoleUser}});
                if (x1 == 0)
                    errores.push('El rol no existe');
            }
        }
        if (tipo == 2) {
            if (id == '' || id == undefined)
                errores.push('El ID no puede ser nulo');
            if (errores.length == 0) {
                var x1 = await User.count({where : {'idUser' : id}});
                if (x1 == 0)
                    errores.push('El ID No existe');
            }
        }
        if (tipo == 3) {
            if (id == '' || id == undefined)
                errores.push('El ID no puede ser nulo');
            if (errores.length == 0) {
                var x1 = await User.count({where : {'idUser' : id}});
                if (x1 == 0)
                    errores.push('El ID No existe');
            }
            if (body.NameUser == '' || body.NameUser == undefined)
                errores.push('El Nombre no puede ser nulo');
            if (body.PasswordUser == '' || body.PasswordUser == undefined)
                errores.push('La contraseña no puede ser nula');
            if (body.PasswordUser.length < 8)
                errores.push('La contraseña debe tener al menos 8 caracteres');
            if (body.RoleUser == '' || body.RoleUser == undefined)
                errores.push('El Rol no puede ser nulo');
                isRole = true;
            if (isRole) {
                var x1 = await Role.count({where : {'idRole' : body.RoleUser}});
                if (x1 == 0)
                    errores.push('El rol no existe');
            }
        }
        if (tipo == 4) {
            if (id == '' || id == undefined)
                errores.push('El ID no puede ser nulo');
            if (errores.length == 0) {
                var x1 = await User.count({where : {'idUser' : id}});
                if (x1 == 0)
                    errores.push('El ID No existe');
            }
        }
        const len = errores.length;
        if (len > 0 )
            return errores;
        else
            return false;
    },

    /* Método que crea un usuario dados el NameUser, PasswordUser, RoleUser */
    async createUser(body) {
        const err = await this.validateUser(body,0,1);
        if (err)
            return err;
        await User.create(body);
    },

    /* Método que encuentra a un usuario por el idUser. */ 
    /* Devuelve un objeto json de tipo User. */
    async findUserById(id) {
        const err = await this.validateUser(0,id,2);
        if (err)
            return err;
        const user = await User.findByPk(id);
        return user;
    },

    /* Método que encuentra a todos los registros de User. */ 
    /* Devuelve un array de objetos json de tipo User. */
    async findAllUser() {
        const user = await User.findAll({where : {}});
        return user;
    },

    /* Actualizar datos de un usuario dado el idUser */
    async updateUser(body, id) {
        const err = await this.validateUser(body,id,3);
        if (err)
            return err;
        user = await User.findByPk(id);
        if (user != null) {
            await User.update({
                NameUser: body.NameUser,
                PasswordUser: body.PasswordUser,
                RoleUser: body.RoleUser
            }, { 
                where : { idUser: id}
            }).catch(function () {
                console.log("Promise Rejected");
           });
        }
    },

    /* Método que elimina un usuario dado el idUser */
    async deleteUser(id) {
        const err = await this.validateUser(0,id,4);
        if (err)
            return err;
        await User.destroy({ where: { idUser: id } });
    },

    /* Método que encuentra a un usuario por el username y el password. */ 
    /* Devuelve un objeto json de tipo User. */
    async findUser(username, password) {
        const user = await User.findOne({ where: { NameUser: username, PasswordUser: password } });
        return user;
    }

};