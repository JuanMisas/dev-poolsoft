const Sequelize = require('sequelize');
const PT = require('../models/ps_PoolType');
const server = require('../server/server');
const { check, validationResult } = require('express-validator');
const { validate } = require('../server/connection');
const { INTEGER } = require('sequelize');


module.exports = {

    async validePool(NP, id, tipo) {
        var errores = [];
        if (tipo > 1) {
            var x1 = await PT.count({ where: { 'idTypePool': id } });
            if (x1 == 0)
                errores.push('El ID No existe');
        }
        if (tipo == 1 || tipo == 2) {
            if (tipo == 1) {
                var x1 = await PT.count({ where: { 'idTypePool': NP.idTypePool } });
                if (x1 > 0)
                    errores.push('El ID ya existe');
            }
            if (NP.idTypePool == undefined) {
                errores.push('El ID no puede ser nulo');
            }
            if (NP.NameTypePool == '' || NP.NameTypePool == undefined) {
                errores.push('El Nombre no puede ser nulo');
            }
        }
        const len = errores.length;
        if (len > 0)
            return errores;
        else
            return false;
    },

    async findPoolTypeOne(id) {
        const err = (await this.validePool({}, id, 5));
        if (err) {
            return err;
        }
        const PoolType = await PT.findByPk(id);
        return PoolType;
    },

    async findAllPoolType() {
        const PoolType = await PT.findAll({ where: {} });
        return PoolType;
    },

    async CreatePoolType(NewPooltype) {
        const err = await this.validePool(NewPooltype, 0, 1);
        if (err) {
            return err;
        }
        const PoolType = await PT.create(NewPooltype);
        return PoolType;
    },

    async UpdatePoolType(body, id) {
        const err = await this.validePool(body, id, 2);
        if (err) {
            return err;
        }
        if (body.idTypePool == '') {
            body.idTypePool = id;
        }
        const PoolType = await PT.update(body, { where: { idTypePool: id } });
        return PoolType;
    },

    async DeletePoolType(id) {
        const err = await this.validePool({}, id, 3);
        if (err) {
            return err;
        }
        const PoolType = await PT.destroy({ where: { idTypePool: id } });
        return PoolType;
    },

    //  ===========================
    //  ======= Q U E R Y S =======
    //  ===========================

    /** Devuelve true si lo encuentra, sino devuelve false */
    async existsIdPoolType(id) {
        aux = await PT.findByPk(id).catch(function() {
            console.log("Promise Rejected");
        });
        if (aux == null) {
            return false;
        } else {
            return true;
        }
    }
};