const Sequelize = require('sequelize');
const UnitedMeasured = require('../models/ps_unitedmeasured');
const server = require('../server/server');

module.exports = {
    async validateUnitedMeasured(tipo, id, body) {

    err = [];

    if (tipo == 'find_one') {

        if (id == undefined) {
            err.push('El ID de la Unidad de Medida no puede ser nulo.');
        }
        if (!(await this.existsIdUnitedMeasured(id))) {
            err.push('La unidad de medida no existe.');
        }
        return err;

    } else if (tipo == 'find_all') {

        return err;

    } else if (tipo == 'create') {
        if (body.idUnitedMeasured) {
            if (await this.existsIdUnitedMeasured(body.idUnitedMeasured)) {
                err.push('La unidad de medida ya existe.');
            }
        }
        if (body.NameUnitedMeasured == null || body.NameUnitedMeasured == "") {
            err.push('El nombre no puede ser vacío.');
        }
        return err;

    } else if (tipo == 'update') {
        if (id == undefined) {
            err.push('El ID de la Unidad de Medida no puede ser nulo.');
        }
        if (!(await this.existsIdUnitedMeasured(id))) {
            err.push('La Unidad de Medida no existe.');
        }
        if (body.NameUnitedMeasured == null || body.NameUnitedMeasured == "") {
            err.push('El nombre no puede ser vacío.');
        }
        return err;

    } else if (tipo == 'delete') {

        if (id == undefined) {
            err.push('El ID de la unidad de Medida no puede ser nulo.');
        }
        if (!(await this.existsIdUnitedMeasured(id))) {
            err.push('El Id de la unidad de Medida No existe.');
        }
        return err;

    }
},

    /* Método que encuentra a una unidad de medida por el idUnitedMeasured. */
    /* Devuelve un objeto json de tipo UnitedMeasured. */

    async findUnitedMeasuredById(id) {
        const err = await this.validateUnitedMeasured('find_one', id, {});
        if (err.length > 0) {
            throw err;
        }
        const unitedMeasured = await UnitedMeasured.findByPk(id);
        return unitedMeasured;
    },

    /* Método que encuentra a todos los registros de UnitedMeasured. */
    /* Devuelve un array de objetos json de tipo Role. */
    async findAllUnitedMeasured() {
        const unitedMeasured = await UnitedMeasured.findAll({ where: {} });
        return unitedMeasured;
    },

    /* Método que crea una unidad de medida dado el nameUnitedMeasured */
    async createUnitedMeasured(body) {
        const err = await this.validateUnitedMeasured('create', {}, body);
        if (err.length > 0) {
            throw err;
        }

        const  unitedMeasured = await UnitedMeasured.create(body);
        return unitedMeasured;
    },
    
    /* Actualizar datos de una unidad de medida dado el idUnitedMeasured y nameUnitedMeasured */
    async updateUnitedMeasured(id, body) {
        const err = await this.validateUnitedMeasured('update', id, body);
        if (err.length > 0) {
            throw err;
        }

        body.idUnitedMeasured = id;
        const unitedMeasured = await UnitedMeasured.update(body, { where: { idUnitedMeasured: id } });
        if (UnitedMeasured[0] == 1) {
            return true;
        }

    },

    /* Método que elimina una unidad de meidad dado el idUnitedMeasured */
    async deleteUnitedMeasured(id) {

        const err = await this.validateUnitedMeasured('delete', id, {});
        if (err.length > 0) {
            throw err;
        }

        const unitedMeasured = await UnitedMeasured.destroy({ where: { idUnitedMeasured: id } });
        if (unitedMeasured == 1) {
            return true;
        }
    },


    //  ===========================
    //  ======= Q U E R Y S =======
    //  ===========================

    /** Devuelve true si lo encuentra, sino devuelve false */
    async existsIdUnitedMeasured(id) {
         aux = await UnitedMeasured.findByPk(id).catch(function() {
            console.log("Promise Rejected");
        });
        if (aux == null) {
            return false;
        } else {
            return true;
        }
    }

};