const Sequelize = require('sequelize');
const IDCLIENTTYPE = require('../models/ps_idclienttype');
const server = require('../server/server');

module.exports = {

    /**
     * Valida dependiendo del tipo: 'find_one', 'find_all', 'create', 'update', 'delete'.
     * Variables de entrada: tipo, id, body.
     * Retorna: un arreglo con los mensajes de error. Si no hay errores, retorna un arreglo vacío.
     */
    async validateIdClientType(tipo, id, body) {

        err = [];

        if (tipo == 'find_one') {

            if (id == undefined) {
                err.push('El ID de identificación de tipo de cliente no puede ser nulo.');
            }
            if (!(await this.existsIdIdClientType(id))) {
                err.push('La identificación de tipo de cliente no existe.');
            }
            return err;

        } else if (tipo == 'find_all') {

            return err;

        } else if (tipo == 'create') {

            if (body.IdIdClientType) {
                if (await this.existsIdIdClientType(body.IdIdClientType)) {
                    err.push('La identificación de tipo de cliente ya existe.');
                }
            }
            if (body.NameIdClientType == null || body.NameIdClientType == "") {
                err.push('El nombre no puede ser vacío.');
            }
            return err;

        } else if (tipo == 'update') {

            if (id == undefined) {
                err.push('El ID de identificación de tipo de cliente no puede ser nulo.');
            }
            if (!(await this.existsIdIdClientType(id))) {
                err.push('La identificación de tipo de cliente no existe.');
            }
            if (body.NameIdClientType == null || body.NameIdClientType == "") {
                err.push('El nombre no puede ser vacío.');
            }
            return err;

        } else if (tipo == 'delete') {

            if (id == undefined) {
                err.push('El ID de la identificación de tipo de cliente no puede ser nulo.');
            }
            if (!(await this.existsIdIdClientType(id))) {
                err.push('La identificación de tipo de cliente no existe.');
            }
            return err;

        }
    },

    //  =======================
    //  ======= C R U D =======
    //  =======================

    /**
     * @param {id} id 
     * @returns Objeto IdClientType o array de errores
     */
    async findOneIdClientType(id) {
        const err = await this.validateIdClientType('find_one', id, {});
        if (err.length > 0) {
            throw err;
        }

        const IdClientType = await IDCLIENTTYPE.findByPk(id);
        return IdClientType;
    },

    /**
     * 
     * @returns Array de objetos IdClientType
     */
    async findAllIdClientTypes() {
        // const err = await this.validateIdClientType('find_all', {}, {});
        // if (err.length > 0) {
        //     throw err;
        // }

        const IdClientType = await IDCLIENTTYPE.findAll({ where: {} });
        return IdClientType;
    },

    /**
     * 
     * @param {body} body 
     * @returns Objeto IdClientType o array de errores
     */
    async createIdClientType(body) {
        const err = await this.validateIdClientType('create', {}, body);
        if (err.length > 0) {
            throw err;
        }

        const IdClientType = await IDCLIENTTYPE.create(body);
        return IdClientType;
    },

    /**
     * 
     * @param {id} id
     * @param {body} body  
     * @returns Variable boolean true o array de errores
     */
    async updateIdClientType(id, body) {
        const err = await this.validateIdClientType('update', id, body);
        if (err.length > 0) {
            throw err;
        }

        body.IdIdClientType = id;
        const IdClientType = await IDCLIENTTYPE.update(body, { where: { IdIdClientType: id } });
        if (IdClientType[0] == 1) {
            return true;
        }
    },

    /**
     * 
     * @param {id} id 
     * @returns Variable boolean true o array de errores
     */
    async deleteIdClientType(id) {
        const err = await this.validateIdClientType('delete', id, {});
        if (err.length > 0) {
            throw err;
        }

        const IdClientType = await IDCLIENTTYPE.destroy({ where: { IdIdClientType: id } });
        if (IdClientType == 1) {
            return true;
        }
    },

    //  ===========================
    //  ======= Q U E R Y S =======
    //  ===========================

    /** Devuelve true si lo encuentra, sino devuelve false */
    async existsIdIdClientType(id) {
        aux = await IDCLIENTTYPE.findByPk(id).catch(function() {
            console.log("Promise Rejected");
        });
        if (aux == null) {
            return false;
        } else {
            return true;
        }
    }

};