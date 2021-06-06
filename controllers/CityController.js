const Sequelize = require('sequelize');
const server = require('../server/server');
const { validate } = require('../server/connection');
const { INTEGER } = require('sequelize');
const StateController = require('./stateController.js');
const CITY = require('../models/ps_city');
const { QueryTypes } = require('sequelize');
const { sequelize } = require('../models/ps_country');



module.exports = {

    /**
     * Valida dependiendo del tipo: 'find_one', 'find_all', 'create', 'update', 'delete'.
     * Variables de entrada: tipo, id, body.
     * Retorna: un arreglo con los mensajes de error. Si no hay errores, retorna un arreglo vacío.
     */
    async validateCity(tipo, id, body) {

        err = [];

        if (tipo == 'find_one') {

            if (id == undefined) {
                err.push('El ID de la ciudad no puede ser nulo.');
            }
            if (!(await this.existsIdCity(id))) {
                err.push('La ciudad no existe.');
            }
            return err;

        } else if (tipo == 'find_all') {

            return err;

        } else if (tipo == 'create') {

            if (body.IdCity) {
                if (await this.existsIdCity(body.IdCity)) {
                    err.push('La ciudad ya existe.');
                }
            }
            if (body.IdStateCity == null || body.IdStateCity == "") {
                err.push('El ID del estado no puede ser vacío.');
            }
            if (body.IdStateCity) {
                if (!(await StateController.existsIdState(body.IdStateCity))) {
                    err.push('El estado no existe.');
                }
            }
            if (body.NameCity == null || body.NameCity == "") {
                err.push('El nombre no puede ser vacío.');
            }
            return err;

        } else if (tipo == 'update') {

            if (id == undefined) {
                err.push('El ID de la ciudad no puede ser nulo.');
            }
            if (!(await this.existsIdCity(id))) {
                err.push('La ciudad no existe.');
            }
            if (body.IdStateCity == null || body.IdStateCity == "") {
                err.push('El ID del estado no puede ser vacío.');
            }
            if (body.IdStateCity) {
                if (!(await StateController.existsIdState(body.IdStateCity))) {
                    err.push('El estado no existe.');
                }
            }
            if (body.NameCity == null || body.NameCity == "") {
                err.push('El nombre no puede ser vacío.');
            }
            return err;

        } else if (tipo == 'delete') {

            if (id == undefined) {
                err.push('El ID de la ciudad no puede ser nulo.');
            }
            if (!(await this.existsIdCity(id))) {
                err.push('La ciudad no existe.');
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
    async findOneCity(id) {
        const err = await this.validateCity('find_one', id, {});
        if (err.length > 0) {
            throw err;
        }

        const city = await CITY.findByPk(id);
        return city;
    },

    /**
     * 
     * @returns Array de objetos City
     */
    async findAllCities() {
        // const err = await this.validateCity('find_all', {}, {});
        // if (err.length > 0) {
        //     throw err;
        // }

        const city = await CITY.findAll({ where: {} });
        return city;
    },

    async findAllCityStateCountry() {
        const cityall = await sequelize.query(
            "select a.IdCity, a.NameCity , b.IdState, b.NameState, c.IdCountry, c.NameCountry from ps_city a inner join ps_state b on a.IdStateCity = b.IdState inner join ps_country c on b.IdCountryState = c.IdCountry order by IdCity", {
                raw: true,
                type: QueryTypes.SELECT
            });
        return cityall;
    },

    /**
     * 
     * @param {body} body 
     * @returns Objeto City o array de errores
     */

    async createCity(body) {
        const err = await this.validateCity('create', {}, body);
        if (err.length > 0) {
            throw err;
        }

        const city = await CITY.create(body);
        return city;
    },

    /**
     * 
     * @param {id} id
     * @param {body} body  
     * @returns Variable boolean true o array de errores
     */
    async updateCity(id, body) {
        const err = await this.validateCity('update', id, body);
        if (err.length > 0) {
            throw err;
        }

        body.IdCity = id;
        const city = await CITY.update(body, { where: { IdCity: id } });
        if (city[0] == 1) {
            return true;
        }
    },

    /**
     * 
     * @param {id} id 
     * @returns Variable boolean true o array de errores
     */
    async deleteCity(id) {
        const err = await this.validateCity('delete', id, {});
        if (err.length > 0) {
            throw err;
        }

        const city = await CITY.destroy({ where: { IdCity: id } });
        if (city == 1) {
            return true;
        }
    },

    //  ===========================
    //  ======= Q U E R Y S =======
    //  ===========================

    /** Devuelve true si lo encuentra, sino devuelve false */
    async existsIdCity(id) {
        aux = await CITY.findByPk(id).catch(function() {
            console.log("Promise Rejected");
        });
        if (aux == null) {
            return false;
        } else {
            return true;
        }
    }

};