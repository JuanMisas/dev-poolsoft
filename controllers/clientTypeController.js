const Sequelize = require('sequelize');
const CLIENTTYPE = require('../models/ps_clienttype');
const server = require('../server/server');

module.exports = {

    /**
     * Valida dependiendo del tipo: 'find_one', 'find_all', 'create', 'update', 'delete'.
     * Variables de entrada: tipo, id, body.
     * Retorna: un arreglo con los mensajes de error. Si no hay errores, retorna un arreglo vacío.
     */
    async validateClientType(tipo, id, body) {

        err = [];

        if (tipo == 'find_one') {

            if (id == undefined) {
                err.push('El ID del tipo de cliente no puede ser nulo.');
            }
            if (!(await this.existsIdClientType(id))) {
                err.push('El tipo de cliente no existe.');
            }
            return err;

        } else if (tipo == 'find_all') {

            return err;

        } else if (tipo == 'create') {

            if (body.idClientType) {
                if (await this.existsIdClientType(body.idClientType)) {
                    err.push('El tipo de cliente ya existe.');
                }
            }
            if (body.NameClientType == null || body.NameClientType == "") {
                err.push('El nombre no puede ser vacío.');
            }
            return err;

        } else if (tipo == 'update') {

            if (id == undefined) {
                err.push('El ID del tipo de cliente no puede ser nulo.');
            }
            if (!(await this.existsIdClientType(id))) {
                err.push('El tipo de cliente no existe.');
            }
            if (body.NameClientType == null || body.NameClientType == "") {
                err.push('El nombre no puede ser vacío.');
            }
            return err;

        } else if (tipo == 'delete') {

            if (id == undefined) {
                err.push('El ID del tipo de cliente no puede ser nulo.');
            }
            if (!(await this.existsIdClientType(id))) {
                err.push('El tipo de cliente no existe.');
            }
            return err;

        }
    },

    //  =======================
    //  ======= C R U D =======
    //  =======================

    /**
     * @param {id} id 
     * @returns Objeto ClientType o array de errores
     */
    async findOneClientType(id) {
        const err = await this.validateClientType('find_one', id, {});
        if (err.length > 0) {
            throw err;
        }

        const ClientType = await CLIENTTYPE.findByPk(id);
        return ClientType;
    },

    /**
     * 
     * @returns Array de objetos ClientType
     */
    async findAllClientTypes() {
        // const err = await this.validateClientType('find_all', {}, {});
        // if (err.length > 0) {
        //     throw err;
        // }

        const ClientType = await CLIENTTYPE.findAll({ where: {} });
        return ClientType;
    },

    /**
     * 
     * @param {body} body 
     * @returns Objeto ClientType o array de errores
     */
    async createClientType(body) {
        const err = await this.validateClientType('create', {}, body);
        if (err.length > 0) {
            throw err;
        }

        const ClientType = await CLIENTTYPE.create(body);
        return ClientType;
    },

    /**
     * 
     * @param {id} id
     * @param {body} body  
     * @returns Variable boolean true o array de errores
     */
    async updateClientType(id, body) {
        const err = await this.validateClientType('update', id, body);
        if (err.length > 0) {
            throw err;
        }

        body.idClientType = id;
        const ClientType = await CLIENTTYPE.update(body, { where: { idClientType: id } });
        if (ClientType[0] == 1) {
            return true;
        }
    },

    /**
     * 
     * @param {id} id 
     * @returns Variable boolean true o array de errores
     */
    async deleteClientType(id) {
        const err = await this.validateClientType('delete', id, {});
        if (err.length > 0) {
            throw err;
        }

        const ClientType = await CLIENTTYPE.destroy({ where: { idClientType: id } });
        if (ClientType == 1) {
            return true;
        }
    },

    //  ===========================
    //  ======= Q U E R Y S =======
    //  ===========================

    /** Devuelve true si lo encuentra, sino devuelve false */
    async existsIdClientType(id) {
        aux = await CLIENTTYPE.findByPk(id).catch(function() {
            console.log("Promise Rejected");
        });
        if (aux == null) {
            return false;
        } else {
            return true;
        }
    }

};