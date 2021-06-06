const Sequelize = require('sequelize');
const STATE = require('../models/ps_state');
const server = require('../server/server');
const { validate } = require('../server/connection');
const { INTEGER } = require('sequelize');
const CountryController = require('./countryController.js');
const { QueryTypes } = require('sequelize');
const { sequelize } = require('../models/ps_state');

module.exports = {

    /**
     * Valida dependiendo del tipo: 'find_one', 'find_all', 'create', 'update', 'delete'.
     * Variables de entrada: tipo, id, body.
     * Retorna: un arreglo con los mensajes de error. Si no hay errores, retorna un arreglo vacío.
     */
    async validateState(tipo, id, body) {

        err = [];

        if (tipo == 'find_one') {

            if (id == undefined) {
                err.push('El ID del estado no puede ser nulo.');
            }
            if (!(await this.existsIdState(id))) {
                err.push('El estado no existe.');
            }
            return err;

        } else if (tipo == 'find_all') {

            return err;

        } else if (tipo == 'find_all_state_country') {

            if (!(await this.existsAllStateCountry())) {
                err.push('No hay estados.');
            }

            return err;

        } else if (tipo == 'find_state_country') {

            if (!(await this.existsStateCountry(id))) {
                err.push('Este país no tiene estados.');
            }

            return err;

        } else if (tipo == 'create') {

            if (body.IdState) {
                if (await this.existsIdState(body.IdState)) {
                    err.push('El estado ya existe.');
                }
            }
            if (body.IdCountryState == null || body.IdCountryState == "") {
                err.push('El ID del pais no puede ser vacío.');
            }
            if (body.IdCountryState) {
                if (!(await CountryController.existsIdCountry(body.IdCountryState))) {
                    err.push('El país no existe.');
                }
            }
            if (body.NameState == null || body.NameState == "") {
                err.push('El nombre no puede ser vacío.');
            }
            return err;

        } else if (tipo == 'update') {

            if (id == undefined) {
                err.push('El ID del estado no puede ser nulo.');
            }
            if (!(await this.existsIdState(id))) {
                err.push('El estado no existe.');
            }
            if (body.IdCountryState == null || body.IdCountryState == "") {
                err.push('El ID del pais no puede ser vacío.');
            }
            if (body.IdCountryState) {
                if (!(await CountryController.existsIdCountry(body.IdCountryState))) {
                    err.push('El país no existe.');
                }
            }
            if (body.NameState == null || body.NameState == "") {
                err.push('El nombre no puede ser vacío.');
            }
            return err;

        } else if (tipo == 'delete') {

            if (id == undefined) {
                err.push('El ID del estado no puede ser nulo.');
            }
            if (!(await this.existsIdState(id))) {
                err.push('El estado no existe.');
            }
            return err;

        }
    },

    //  =======================
    //  ======= C R U D =======
    //  =======================

    /**
     * @param {id} id 
     * @returns Objeto State o array de errores
     */
    async findOneState(id) {
        const err = await this.validateState('find_one', id, {});
        if (err.length > 0) {
            throw err;
        }

        const State = await STATE.findByPk(id);
        return State;
    },

    /**
     * 
     * @returns Array de objetos State
     */
    async findAllStates() {
        // const err = await this.validateState('find_all', {}, {});
        // if (err.length > 0) {
        //     throw err;
        // }

        const State = await STATE.findAll({ where: {} });
        return State;
    },

    async findAllStateCountry() {
        const err = await this.validateState('find_all_state_country', {}, {});
        if (err.length > 0) {
            throw err;
        }

        const State = await sequelize.query(
            "select a.IdState, a.NameState, b.IdCountry, b.NameCountry from ps_state a inner join ps_country b on a.IdCountryState = b.IdCountry order by IdState", {
                raw: true,
                type: QueryTypes.SELECT
            });
        return State;
    },

    async findStateCountry(id) {
        const err = await this.validateState('find_state_country', id, {});
        if (err.length > 0) {
            throw err;
        }

        const State = await sequelize.query(
            "select * from ps_state where IdCountryState = " + id + " order by IdState", {
                raw: true,
                type: QueryTypes.SELECT
            });
        return State;
    },

    /**
     * 
     * @param {body} body 
     * @returns Objeto State o array de errores
     */
    async createState(body) {
        const err = await this.validateState('create', {}, body);
        if (err.length > 0) {
            throw err;
        }

        const State = await STATE.create(body);
        return State;
    },

    /**
     * 
     * @param {id} id
     * @param {body} body  
     * @returns Variable boolean true o array de errores
     */
    async updateState(id, body) {
        const err = await this.validateState('update', id, body);
        if (err.length > 0) {
            throw err;
        }

        body.IdState = id;
        const State = await STATE.update(body, { where: { IdState: id } });
        if (State[0] == 1) {
            return true;
        }
    },

    /**
     * 
     * @param {id} id 
     * @returns Variable boolean true o array de errores
     */
    async deleteState(id) {
        const err = await this.validateState('delete', id, {});
        if (err.length > 0) {
            throw err;
        }

        const State = await STATE.destroy({ where: { IdState: id } });
        if (State == 1) {
            return true;
        }
    },

    //  ===========================
    //  ======= Q U E R Y S =======
    //  ===========================

    /** Devuelve true si lo encuentra, sino devuelve false */
    async existsIdState(id) {
        aux = await STATE.findByPk(id).catch(function() {
            console.log("Promise Rejected");
        });
        if (aux == null) {
            return false;
        } else {
            return true;
        }
    },

    /** Devuelve true si encuentra al menos uno, sino devuelve false */
    async existsStateCountry(id) {
        states = await sequelize.query(
            "select * from ps_state where IdCountryState = " + id, {
                raw: true,
                type: QueryTypes.SELECT
            });

        if (states.length > 0) {
            return true;
        } else {
            return false;
        }
    },

    /** Devuelve true si encuentra al menos uno, sino devuelve false */
    async existsAllStateCountry() {
        states = await sequelize.query(
            "select a.IdState, a.NameState, b.IdCountry, b.NameCountry from ps_state a inner join ps_country b on a.IdCountryState = b.IdCountry", {
                raw: true,
                type: QueryTypes.SELECT
            });

        if (states.length > 0) {
            return true;
        } else {
            return false;
        }
    }

};