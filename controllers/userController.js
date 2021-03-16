const Sequelize = require('sequelize');
const User = require('../models/ps_user');
const server = require('../server/server');

module.exports = {
    async createUser(req, res) {
        const jane = await User.create({NameUser: 'Post two', PasswordUser: 'lalala', RoleUser: 1});
        console.log("Jane's auto-generated ID:", jane.idUser);
    },

    async findUser(username, password) {
        const user = await User.findOne({ where: { NameUser: username, PasswordUser: password } });
        if (user == null) {
            return false;
        } else {
            return true;
        }
    },
};


// module.exports = {

//  create(req, res) {
//     return User
//         .create ({
//              NameUser: req.params.NameUser,
//              PasswordUser: req.params.PasswordUser,
//              RoleUser: req.params.RoleUser
//         })
//         .then(usuario => res.status(200).send(User))
//         .catch(error => res.status(400).send(error))
//  },

//  list(_, res) {
//      return User.findAll({})
//         .then(usuario => res.status(200).send(User))
//         .catch(error => res.status(400).send(error))
//  },

//  find (req, res) {
//      return User.findAll({
//          where: {
//              username: req.params.username,
//          }
//      })
//      .then(User => res.status(200).send(User))
//      .catch(error => res.status(400).send(error))
//   },
// };