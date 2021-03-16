// 'use strict';

// const UserModel = (sequelize, Sequelize) => {
//     const {INTEGER, STRING, FLOAT, BOOLEAN, DATE} = Sequelize
//     const User = sequelize.define('User', {
//         idUser: {
//             type: INTEGER, 
//             primaryKey: true, 
//             autoIncrement: true
//         },
//         NameUser: {
//             type: STRING, 
//             required: true, 
//             allowNull: false
//         },
//         PasswordUser: {
//             type: STRING, 
//             required: true, 
//             allowNull: false
//         },
//         RoleUser: {
//             type: INTEGER, 
//             required: true, 
//             allowNull: false
//         }
//     })
//     return User
// }

// module.exports = UserModel

const Sequelize = require('sequelize'); 
const db = require('../server/connection');

const User = db.define('ps_user', {
    idUser: {
        type: Sequelize.INTEGER, 
        primaryKey: true, 
        autoIncrement: true
    },
    NameUser: {
        type: Sequelize.STRING, 
        required: true, 
        allowNull: false
    },
    PasswordUser: {
        type: Sequelize.STRING, 
        required: true, 
        allowNull: false
    },
    RoleUser: {
        type: Sequelize.INTEGER, 
        required: true, 
        allowNull: false
    }
}, {
    freezeTableName: true
})

module.exports = User;