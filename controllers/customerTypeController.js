const Sequelize = require('sequelize');
const CUSTOMERTYPE = require('../models/ps_customertype');
const server = require('../server/server');

module.exports = {

    /**
     * Valida dependiendo del tipo: 'find_one', 'find_all', 'create', 'update', 'delete'.
     * Variables de entrada: tipo, id, body.
     * Retorna: un arreglo con los mensajes de error. Si no hay errores, retorna un arreglo vacío.
     */
    async validateCustomerType(tipo, id, body) {

        err = [];

        if (tipo == 'find_one') {

            if (id == undefined) {
                err.push('El ID del tipo de cliente no puede ser nulo.');
            }
            if (!(await this.existsIdCustomerType(id))) {
                err.push('El tipo de Cliente no existe.');
            }
            return err;

        } else if (tipo == 'find_all') {

            return err;

        } else if (tipo == 'create') {

            if (body.idcustomerType) {
                if (await this.existsIdCustomerType(body.idCustomerType)) {
                    err.push('El tipo de Cliente ya existe.');
                }
            }
            if (body.NameCustomerType == null || body.NameCustomerType == "") {
                err.push('El nombre no puede ser vacío.');
            }
            return err;

        } else if (tipo == 'update') {

            if (id == undefined) {
                err.push('El ID del tipo de Cliente no puede ser nulo.');
            }
            if (!(await this.existsIdCustomerType(id))) {
                err.push('El tipo de Cliente no existe.');
            }
            if (body.NameCustomerType == null || body.NameCustomerType == "") {
                err.push('El nombre no puede ser vacío.');
            }
            return err;

        } else if (tipo == 'delete') {

            if (id == undefined) {
                err.push('El ID del tipo de Cliente no puede ser nulo.');
            }
            if (!(await this.existsIdCustomerType(id))) {
                err.push('El tipo de Cliente no existe.');
            }
            return err;

        }
    },

    //  =======================
    //  ======= C R U D =======
    //  =======================

    /**
     * @param {id} id 
     * @returns Objeto CustomerType o array de errores
     */
    async findOneCustomerType(id) {
        const err = await this.validateCustomerType('find_one', id, {});
        if (err.length > 0) {
            throw err;
        }

        const customerType = await CustomerType.findByPk(id);
        return customerType;
    },

    /**
     * 
     * @returns Array de objetos CustomerType
     */
    async findAllCustomerTypes() {
        // const err = await this.validateCustomerType('find_all', {}, {});
        // if (err.length > 0) {
        //     throw err;
        // }

        const customerType = await CustomerType.findAll({ where: {} });
        return customerType;
    },

    /**
     * 
     * @param {body} body 
     * @returns Objeto CustomerType o array de errores
     */
    async createCustomerType(body) {
        const err = await this.validateCustomerType('create', {}, body);
        if (err.length > 0) {
            throw err;
        }

        const customerType = await CustomerType.create(body);
        return customerType;
    },

    /**
     * 
     * @param {id} id
     * @param {body} body  
     * @returns Variable boolean true o array de errores
     */
    async updateCustomerType(id, body) {
        const err = await this.validateCustomerType('update', id, body);
        if (err.length > 0) {
            throw err;
        }

        body.idCustomerType = id;
        const customerType = await CustomerType.update(body, { where: { idCustomerType: id } });
        if (customerType[0] == 1) {
            return true;
        }
    },

    /**
     * 
     * @param {id} id 
     * @returns Variable boolean true o array de errores
     */
    async deleteCustomerType(id) {
        const err = await this.validateCustomerType('delete', id, {});
        if (err.length > 0) {
            throw err;
        }

        const customerType = await CustomerType.destroy({ where: { idCustomerType: id } });
        if (customerType == 1) {
            return true;
        }
    },

    //  ===========================
    //  ======= Q U E R Y S =======
    //  ===========================

    /** Devuelve true si lo encuentra, sino devuelve false */
    async existsIdCustomerType(id) {
        aux = await CustomerType.findByPk(id).catch(function() {
            console.log("Promise Rejected");
        });
        if (aux == null) {
            return false;
        } else {
            return true;
        }
    }

};