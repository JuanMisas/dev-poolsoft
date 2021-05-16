const Sequelize = require('sequelize');
const FILTERTYPE = require('../models/ps_filtertype');
const server = require('../server/server');
const { validate } = require('../server/connection');
const { INTEGER } = require('sequelize');


module.exports = {

    /**
     * Valida dependiendo del tipo: 'find_one', 'find_all', 'create', 'update', 'delete'.
     * Variables de entrada: tipo, id, body.
     * Retorna: un arreglo con los mensajes de error. Si no hay errores, retorna un arreglo vacío.
     */
    async validateFilterType(tipo, id, body) {

        err = [];

        if (tipo == 'find_one') {

            if (id == undefined) {
                err.push('El ID del tipo de filtro no puede ser nulo.');
            }
            if (!(await this.existsIdFilterType(id))) {
                err.push('El tipo de filtro no existe.');
            }
            return err;

        } else if (tipo == 'find_all') {

            return err;

        } else if (tipo == 'create') {

            if (body.idFilterType) {
                if (await this.existsIdFilterType(body.idFilterType)) {
                    err.push('El tipo de filtro ya existe.');
                }
            }
            if (body.NameFilterType == null || body.NameFilterType == "") {
                err.push('El nombre de tipo de filtro no puede ser vacío.');
            }
            return err;

        } else if (tipo == 'update') {

            if (id == undefined) {
                err.push('El ID del tipo de filtro no puede ser nulo.');
            }
            if (!(await this.existsIdFilterType(id))) {
                err.push('El tipo de filtro no existe.');
            }
            if (body.NameFilterType == null || body.NameFilterType == "") {
                err.push('El nombre no puede ser vacío.');
            }
            return err;

        } else if (tipo == 'delete') {

            if (id == undefined) {
                err.push('El ID de tipo de filtro no puede ser nulo.');
            }
            if (!(await this.existsIdFilterType(id))) {
                err.push('El tipo de filtro no existe.');
            }
            return err;

        }
    },

    //  =======================
    //  ======= C R U D =======
    //  =======================

    /**
     * @param {id} id 
     * @returns Objeto FilterType o array de errores
     */
    async findOneFilterType(id) {
        const err = await this.validateFilterType('find_one', id, {});
        if (err.length > 0) {
            throw err;
        }

        const FilterType = await FILTERTYPE.findByPk(id);
        return FilterType;
    },

    /**
     * 
     * @returns Array de objetos FilterType
     */
    async findAllFilterTypes() {
        // const err = await this.validateFilterType('find_all', {}, {});
        // if (err.length > 0) {
        //     throw err;
        // }

        const FilterType = await FILTERTYPE.findAll({ where: {} });
        return FilterType;
    },

    /**
     * 
     * @param {body} body 
     * @returns Objeto FilterType o array de errores
     */
    async createFilterType(body) {
        const err = await this.validateFilterType('create', {}, body);
        if (err.length > 0) {
            throw err;
        }

        const FilterType = await FILTERTYPE.create(body);
        return FilterType;
    },

    /**
     * 
     * @param {id} id
     * @param {body} body  
     * @returns Variable boolean true o array de errores
     */
    async updateFilterType(id, body) {
        const err = await this.validateFilterType('update', id, body);
        if (err.length > 0) {
            throw err;
        }

        body.idFilterType = id;
        const FilterType = await FILTERTYPE.update(body, { where: { idFilterType: id } });
        if (FilterType[0] == 1) {
            return true;
        }
    },

    /**
     * 
     * @param {id} id 
     * @returns Variable boolean true o array de errores
     */
    async deleteFilterType(id) {
        const err = await this.validateFilterType('delete', id, {});
        if (err.length > 0) {
            throw err;
        }

        const FilterType = await FILTERTYPE.destroy({ where: { idFilterType: id } });
        if (FilterType == 1) {
            return true;
        }
    },

    //  ===========================
    //  ======= Q U E R Y S =======
    //  ===========================

    /** Devuelve true si lo encuentra, sino devuelve false */
    async existsIdFilterType(id) {
        aux = await FILTERTYPE.findByPk(id).catch(function() {
            console.log("Promise Rejected");
        });
        if (aux == null) {
            return false;
        } else {
            return true;
        }
    }

};