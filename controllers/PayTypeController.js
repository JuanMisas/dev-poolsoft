const Sequelize = require('sequelize');
const PAYTYPE = require('../models/ps_PayType');
const server = require('../server/server');
const { validate } = require('../server/connection');
const { INTEGER } = require('sequelize');


module.exports = {

    /**
     * Valida dependiendo del tipo: 'find_one', 'find_all', 'create', 'update', 'delete'.
     * Variables de entrada: tipo, id, body.
     * Retorna: un arreglo con los mensajes de error. Si no hay errores, retorna un arreglo vacío.
     */
    async validatePayType(tipo, id, body) {

        err = [];

        if (tipo == 'find_one') {

            if (id == undefined) {
                err.push('El ID del tipo de pago no puede ser nulo.');
            }
            if (!(await this.existsIdPayType(id))) {
                err.push('El tipo de pago no existe.');
            }
            return err;

        } else if (tipo == 'find_all') {

            return err;

        } else if (tipo == 'create') {

            if (body.idPayType) {
                if (await this.existsIdPayType(body.idPayType)) {
                    err.push('El tipo de pago ya existe.');
                }
            }
            if (body.PeriodicityPayType == null || body.PeriodicityPayType == "") {
                err.push('La periodicidad de pago no puede ser vacía.');
            }
            if (body.NamePayType == null || body.NamePayType == "") {
                err.push('El nombre no puede ser vacío.');
            }
            return err;

        } else if (tipo == 'update') {

            if (id == undefined) {
                err.push('El ID del tipo de pago no puede ser nulo.');
            }
            if (!(await this.existsIdPayType(id))) {
                err.push('El tipo de pago no existe.');
            }
            if (body.PeriodicityPayType == null || body.PeriodicityPayType == "") {
                err.push('La periodicidad de pago no puede ser vacía.');
            }
            if (body.NamePayType == null || body.NamePayType == "") {
                err.push('El nombre no puede ser vacío.');
            }
            return err;

        } else if (tipo == 'delete') {

            if (id == undefined) {
                err.push('El ID del tipo de pago no puede ser nulo.');
            }
            if (!(await this.existsIdPayType(id))) {
                err.push('El tipo de pago no existe.');
            }
            return err;

        }
    },

    //  =======================
    //  ======= C R U D =======
    //  =======================

    /**
     * @param {id} id 
     * @returns Objeto PayType o array de errores
     */
    async findOnePayType(id) {
        const err = await this.validatePayType('find_one', id, {});
        if (err.length > 0) {
            throw err;
        }

        const PayType = await PAYTYPE.findByPk(id);
        return PayType;
    },

    /**
     * 
     * @returns Array de objetos PayType
     */
    async findAllPayTypes() {
        // const err = await this.validatePayType('find_all', {}, {});
        // if (err.length > 0) {
        //     throw err;
        // }

        const PayType = await PAYTYPE.findAll({ where: {} });
        return PayType;
    },

    /**
     * 
     * @param {body} body 
     * @returns Objeto PayType o array de errores
     */
    async createPayType(body) {
        const err = await this.validatePayType('create', {}, body);
        if (err.length > 0) {
            throw err;
        }

        const PayType = await PAYTYPE.create(body);
        return PayType;
    },

    /**
     * 
     * @param {id} id
     * @param {body} body  
     * @returns Variable boolean true o array de errores
     */
    async updatePayType(id, body) {
        const err = await this.validatePayType('update', id, body);
        if (err.length > 0) {
            throw err;
        }

        body.idPayType = id;
        const PayType = await PAYTYPE.update(body, { where: { idPayType: id } });
        if (PayType[0] == 1) {
            return true;
        }
    },

    /**
     * 
     * @param {id} id 
     * @returns Variable boolean true o array de errores
     */
    async deletePayType(id) {
        const err = await this.validatePayType('delete', id, {});
        if (err.length > 0) {
            throw err;
        }

        const PayType = await PAYTYPE.destroy({ where: { idPayType: id } });
        if (PayType == 1) {
            return true;
        }
    },

    //  ===========================
    //  ======= Q U E R Y S =======
    //  ===========================

    /** Devuelve true si lo encuentra, sino devuelve false */
    async existsIdPayType(id) {
        aux = await PAYTYPE.findByPk(id).catch(function() {
            console.log("Promise Rejected");
        });
        if (aux == null) {
            return false;
        } else {
            return true;
        }
    }

};