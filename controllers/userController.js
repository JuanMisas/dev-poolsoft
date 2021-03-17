const Sequelize = require('sequelize');
const User = require('../models/ps_user');
const server = require('../server/server');

module.exports = {
    /* Método que crea un usuario dados el NameUser, PasswordUser, RoleUser */
    async createUser(username, password, role) {
        await User.create({NameUser: username, PasswordUser: password, RoleUser: role});
    },

    /* Método que encuentra a un usuario por el username y el password. */ 
    /* Devuelve un objeto json de tipo User. */
    async findUser(username, password) {
        const user = await User.findOne({ where: { NameUser: username, PasswordUser: password } });
        return user;
    },

    /* Método que encuentra a un usuario por el idUser. */ 
    /* Devuelve un objeto json de tipo User. */
    async findUserById(id) {
        const user = await User.findByPk(id);
        return user;
    },

    /* Actualizar datos de un usuario dado el idUser */
    async updateUser(id, username, password, role) {
        user = User.find({ where: { idUser: id } })
        if (user != null) {
            User.update({
                NameUser: username,
                PasswordUser: password,
                RoleUser: role
            })
        }
    },

    /* Método que elimina un usuario dado el idUser */
    async deleteUser(id) {
        await User.destroy({ where: { idUser: id } });
    }

};