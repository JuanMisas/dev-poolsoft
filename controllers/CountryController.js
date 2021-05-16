const Sequelize = require('sequelize');
const COUNTRY = require('../models/ps_Country');
const server = require('../server/server');
const { validate } = require('../server/connection');
const { INTEGER } = require('sequelize');


module.exports = {

    /**
     * Valida dependiendo del tipo: 'find_one', 'find_all', 'create', 'update', 'delete'.
     * Variables de entrada: tipo, id, body.
     * Retorna: un arreglo con los mensajes de error. Si no hay errores, retorna un arreglo vacío.
     */
    async validateCountry(tipo, id, body) {

        err = [];

        if (tipo == 'find_one') {

            if (id == undefined) {
                err.push('El ID del país no puede ser nulo.');
            }
            if (!(await this.existsIdCountry(id))) {
                err.push('El país no existe.');
            }
            return err;

        } else if (tipo == 'find_all') {

            return err;

        } else if (tipo == 'create') {

            if (body.IdCountry) {
                if (await this.existsIdCountry(body.IdCountry)) {
                    err.push('El país ya existe.');
                }
            }
            if (body.NameCountry == null || body.NameCountry == "") {
                err.push('El nombre no puede ser vacío.');
            }
            return err;

        } else if (tipo == 'update') {

            if (id == undefined) {
                err.push('El ID del país no puede ser nulo.');
            }
            if (!(await this.existsIdCountry(id))) {
                err.push('El país no existe.');
            }
            if (body.NameCountry == null || body.NameCountry == "") {
                err.push('El nombre no puede ser vacío.');
            }
            return err;

        } else if (tipo == 'delete') {

            if (id == undefined) {
                err.push('El ID del país no puede ser nulo.');
            }
            if (!(await this.existsIdCountry(id))) {
                err.push('El país no existe.');
            }
            return err;

        }
    },

    //  =======================
    //  ======= C R U D =======
    //  =======================

    /**
     * @param {id} id 
     * @returns Objeto country o array de errores
     */
    async findOneCountry(id) {
        const err = await this.validateCountry('find_one', id, {});
        if (err.length > 0) {
            throw err;
        }

        const Country = await COUNTRY.findByPk(id);
        return Country;
    },

    /**
     * 
     * @returns Array de objetos country
     */
    async findAllCountries() {
        // const err = await this.validateCountry('find_all', {}, {});
        // if (err.length > 0) {
        //     throw err;
        // }

        const Country = await COUNTRY.findAll({ where: {} });
        return Country;
    },

    /**
     * 
     * @param {body} body 
     * @returns Objeto country o array de errores
     */
    async createCountry(body) {
        const err = await this.validateCountry('create', {}, body);
        if (err.length > 0) {
            throw err;
        }

        const Country = await COUNTRY.create(body);
        return Country;
    },

    /**
     * 
     * @param {id} id
     * @param {body} body  
     * @returns Variable boolean true o array de errores
     */
    async updateCountry(id, body) {
        const err = await this.validateCountry('update', id, body);
        if (err.length > 0) {
            throw err;
        }

        body.IdCountry = id;
        const Country = await COUNTRY.update(body, { where: { IdCountry: id } });
        if (Country[0] == 1) {
            return true;
        }
    },

    /**
     * 
     * @param {id} id 
     * @returns Variable boolean true o array de errores
     */
    async deleteCountry(id) {
        const err = await this.validateCountry('delete', id, {});
        if (err.length > 0) {
            throw err;
        }

        const Country = await COUNTRY.destroy({ where: { IdCountry: id } });
        if (Country == 1) {
            return true;
        }
    },

    //  ===========================
    //  ======= Q U E R Y S =======
    //  ===========================

    /** Devuelve true si lo encuentra, sino devuelve false */
    async existsIdCountry(id) {
        aux = await COUNTRY.findByPk(id).catch(function() {
            console.log("Promise Rejected");
        });
        if (aux == null) {
            return false;
        } else {
            return true;
        }
    }

};