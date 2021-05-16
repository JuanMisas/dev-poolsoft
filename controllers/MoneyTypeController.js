const Sequelize = require('sequelize');
const MONEYTYPE = require('../models/ps_moneytype');
const server = require('../server/server');
const { check, validationResult } = require('express-validator');
const { validate } = require('../server/connection');
const { INTEGER } = require('sequelize');
const { update } = require('../models/ps_moneytype');


module.exports = {

    /**
     * Valida dependiendo del tipo: 'find_one', 'find_all', 'create', 'update', 'delete'.
     * Variables de entrada: tipo, id, body.
     * Retorna: un arreglo con los mensajes de error. Si no hay errores, retorna un arreglo vacío.
     */
    async validateMoneyType(tipo, id, body) {

        err = [];

        if (tipo == 'find_one') {

            if (id == undefined) {
                err.push('El ID del tipo de moneda no puede ser nulo.');
            }
            if (!(await this.existsIdMoneyType(id))) {
                err.push('El tipo de moneda no existe.');
            }
            return err;

        } else if (tipo == 'find_all') {

            return err;

        } else if (tipo == 'create') {

            if (body.idTypeMoney) {
                if (await this.existsIdMoneyType(body.idTypeMoney)) {
                    err.push('El tipo de moneda ya existe.');
                }
            }
            if (body.NameTypeMoney == null || body.NameTypeMoney == "") {
                err.push('El nombre no puede ser vacío.');
            }
            return err;

        } else if (tipo == 'update') {

            if (id == undefined) {
                err.push('El ID del tipo de moneda no puede ser nulo.');
            }
            if (!(await this.existsIdMoneyType(id))) {
                err.push('El tipo de moneda no existe.');
            }
            if (body.NameTypeMoney == null || body.NameTypeMoney == "") {
                err.push('El nombre no puede ser vacío.');
            }
            return err;

        } else if (tipo == 'delete') {

            if (id == undefined) {
                err.push('El ID del tipo de moneda no puede ser nulo.');
            }
            if (!(await this.existsIdMoneyType(id))) {
                err.push('El tipo de moneda no existe.');
            }
            return err;

        }
    },

    //  =======================
    //  ======= C R U D =======
    //  =======================

    /**
     * @param {id} id 
     * @returns Objeto MoneyType o array de errores
     */
    async findOneMoneyType(id) {
        const err = await this.validateMoneyType('find_one', id, {});
        if (err.length > 0) {
            throw err;
        }

        const MoneyType = await MONEYTYPE.findByPk(id);
        return MoneyType;
    },

    /**
     * 
     * @returns Array de objetos MoneyType
     */
    async findAllMoneyTypes() {
        // const err = await this.validateMoneyType('find_all', {}, {});
        // if (err.length > 0) {
        //     throw err;
        // }

        const MoneyType = await MONEYTYPE.findAll({ where: {} });
        return MoneyType;
    },

    /**
     * 
     * @param {body} body 
     * @returns Objeto MoneyType o array de errores
     */
    async createMoneyType(body) {
        const err = await this.validateMoneyType('create', {}, body);
        if (err.length > 0) {
            throw err;
        }

        const MoneyType = await MONEYTYPE.create(body);
        return MoneyType;
    },

    /**
     * 
     * @param {id} id
     * @param {body} body  
     * @returns Variable boolean true o array de errores
     */
    async updateMoneyType(id, body) {
        const err = await this.validateMoneyType('update', id, body);
        if (err.length > 0) {
            throw err;
        }

        body.idTypeMoney = id;
        const MoneyType = await MONEYTYPE.update(body, { where: { idTypeMoney: id } });
        if (MoneyType[0] == 1) {
            return true;
        }
    },

    /**
     * 
     * @param {id} id 
     * @returns Variable boolean true o array de errores
     */
    async deleteMoneyType(id) {
        const err = await this.validateMoneyType('delete', id, {});
        if (err.length > 0) {
            throw err;
        }

        const MoneyType = await MONEYTYPE.destroy({ where: { idTypeMoney: id } });
        if (MoneyType == 1) {
            return true;
        }
    },

    //  ===========================
    //  ======= Q U E R Y S =======
    //  ===========================

    /** Devuelve true si lo encuentra, sino devuelve false */
    async existsIdMoneyType(id) {
        aux = await MONEYTYPE.findByPk(id).catch(function() {
            console.log("Promise Rejected");
        });
        if (aux == null) {
            return false;
        } else {
            return true;
        }
    }

};