const { QueryTypes } = require('sequelize');
const { sequelize } = require('../models/ps_user');
const USER = require('../models/ps_user');
const jwt = require('jsonwebtoken');


module.exports = {

    /**
     * Valida dependiendo del tipo: 'find_one', 'find_all', 'create', 'update', 'delete'.
     * Variables de entrada: tipo, id, body.
     * Retorna: un arreglo con los mensajes de error. Si no hay errores, retorna un arreglo vacío.
     */
    async validate(tipo, name, body) {

        err = [];

        if (tipo == 'login') {

            if (!(await this.existsUser(body.NameUser))) {
                err.push('Verifique los datos ingresados.'); // Username doesn't exist
            } else if (!await this.verifyPassword(body.NameUser, body.PasswordUser)) {
                err.push('Verifique los datos ingresados.'); // Password doesn't match
            }

            return err;

        }
    },

    //  =======================
    //  ======= C R U D =======
    //  =======================

    /**
     * @param {id} id 
     * @returns Objeto City o array de errores
     */
    async login(body) {
        const err = await this.validate('login', {}, body);
        if (err.length > 0) {
            throw err;
        }

        const token = jwt.sign({ NameUser: body.NameUser, PasswordUser: body.PasswordUser }, 'secretKey');
        return token;
    },

    //  ===========================
    //  ======= Q U E R Y S =======
    //  ===========================

    /** Devuelve true si lo encuentra, sino devuelve false */
    async existsUser(name) {
        aux = await sequelize.query("select * from ps_user where NameUser = '" + name + "'", {
            raw: true,
            type: QueryTypes.SELECT
        });

        if (aux.length > 0) {
            return true;
        } else {
            return false;
        }
    },

    async verifyPassword(name, password) {
        aux = await sequelize.query("select * from ps_user where NameUser = '" + name + "' and PasswordUser = '" + password + "'", {
            raw: true,
            type: QueryTypes.SELECT
        });

        if (aux.length == 1) {
            return true;
        } else {
            return false;
        }
    },

    verifyToken(req, res, next) {
        console.log(req.headers.Authorization);
        if (!req.headers.Authorization) {
            return res.status(401).send('Unauthorized Request');
        }

        const token = req.headers.Authorization.split(' ')[1];
        if (token === 'null') {
            return res.status(401).send('Unauthorized Request');
        }

        const payload = jwt.verify(token, 'secretKey');
        req.NameUser = payload.NameUser;
        next();
    }

};