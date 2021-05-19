const Sequelize = require('sequelize');
const PT = require('../models/ps_pooltype');
const server = require('../server/server');


module.exports = {

    async validePool(tipo, id, body) {

        err = [];

        if (tipo == 'find_one') {
    
            if (id == undefined) {
                err.push('El ID del tipo de piscina no puede ser nulo.');
            }
            if (!(await this.existsIdPoolType(id))) {
                err.push('El tipo de piscina no existe.');
            }
            return err;
    
        } else if (tipo == 'find_all') {
    
            return err;
    
        } else if (tipo == 'create') {

            if (body.idTypePool) {
                if (await this.existsIdPoolType(body.idTypePool)) {
                    err.push('El tipo de Piscina ya existe.');
                }
            }
            if (body.NameTypePool == null || body.NameTypePool == "") {
                err.push('El nombre no puede ser vacío.');
            }
            return err;
    
        } else if (tipo == 'update') {
            if (id == undefined) {
                err.push('El ID del tipo de Piscina no puede ser nulo.');
            }
            if (!(await this.existsIdPoolType(id))) {
                err.push('El tipo de Piscina no existe.');
            }
            if (body.NameTypePool == null || body.NameTypePool == "") {
                err.push('El nombre no puede ser vacío.');
            }
            return err;
    
        } else if (tipo == 'delete') {
    
            if (id == undefined) {
                err.push('El ID del tipo de piscina no puede ser nulo.');
            }
            if (!(await this.existsIdPoolType(id))) {
                err.push('El Id de la unidad de Medida No existe.');
            }
            return err;
    
        }
    },
    
    async findOnePoolType(id) {
        const err = await this.validePool('find_one', id, {});
        if (err.length > 0) {
            throw err;
        }
        const pt = await PT.findByPk(id);
        return pt;
    },

    async findAllPoolType() {
        const pt = await PT.findAll({ where: {} });
        return pt;
    },

    async createPoolType(body) {
        const err = await this.validePool('create', {}, body);
        if (err.length > 0) {
            throw err;
        }

        const  pt = await PT.create(body);
        return pt;
    },

    async updatePoolType(id, body) {

        const err = await this.validePool('update', id, body);
        if (err.length > 0) {
            throw err;
        }

        body.idTypePool = id;
        const pt = await PT.update(body, { where: { idTypePool : id } });
        if (pt[0] == 1) {
            return true;
        }

    },

    async deletePoolType(id) {
        const err = await this.validePool('delete', id, {});
        if (err.length > 0) {
            throw err;
        }

        const pt = await PT.destroy({ where: { idTypePool: id } });
        if (pt == 1) {
            return true;
        }
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