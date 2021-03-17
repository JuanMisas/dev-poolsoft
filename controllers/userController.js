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
        console.log('epa')
        const user = await User.findOne({ where: { NameUser: username, PasswordUser: password } });
        console.log(user);
        return user;
    },

    /* Método que encuentra a un usuario por el idUser. */ 
    /* Devuelve un objeto json de tipo User. */
    async findUser(id) {
        const user = await User.findByPk(id);
        return user;
    },

    /* Actualizar datos de un usuario dado el idUser */
    async updateUser(id, username, password, role) {
        User.find({ where: { idUser: id } })
        .on('success', function (user) {
          // Asegurarse de que el usuario existe en la BD
          if (user) {
            user.update({
              NameUser: username,
              PasswordUser: password,
              RoleUser: role
            })
            .success(function () {})
          }
        })
    },

    /* Método que elimina un usuario dado el idUser */
    async deleteUser(id) {
        await User.destroy({ where: { idUser: id } });
    }

};