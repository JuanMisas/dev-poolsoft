const Sequelize = require('sequelize');
const UnitedMeasured = require('../models/ps_unitedmeasured');
const server = require('../server/server');

module.exports = {

    async validateUnitedMeasured(body, id, tipo) {
        var errores = [];
        if (tipo == 1) {
            if (body.idUnitedMeasured == '' || body.idUnitedMeasured == undefined)
                errores.push('El ID no puede ser nulo');
            if (errores.length == 0) {
                var x1 = await UnitedMeasured.count({ where: { 'idUnitedMeasured': body.idUnitedMeasured } });
                if (x1 > 0)
                    errores.push('El ID ya existe');
            }
            if (body.NameUnitedMeasured == '' || body.NameUnitedMeasured == undefined)
                errores.push('El Nombre no puede ser nulo');
        }
        if (tipo == 2) {
            if (id == '' || id == undefined)
                errores.push('El ID no puede ser nulo');
            if (errores.length == 0) {
                var x1 = await UnitedMeasured.count({ where: { 'idUnitedMeasured': id } });
                if (x1 == 0)
                    errores.push('El ID No existe');
            }
        }
        if (tipo == 3) {
            if (id == '' || id == undefined)
                errores.push('El ID no puede ser nulo');
            if (errores.length == 0) {
                var x1 = await UnitedMeasured.count({ where: { 'idUnitedMeasured': id } });
                if (x1 == 0)
                    errores.push('El ID No existe');
            }
            if (body.NameUnitedMeasured == '' || body.NameUnitedMeasured == undefined)
                errores.push('El Nombre no puede ser nulo');
        }
        if (tipo == 4) {
            if (id == '' || id == undefined)
                errores.push('El ID no puede ser nulo');
            if (errores.length == 0) {
                var x1 = await UnitedMeasured.count({ where: { 'idUnitedMeasured': id } });
                if (x1 == 0)
                    errores.push('El ID No existe');
            }
        }
        const len = errores.length;
        if (len > 0)
            return errores;
        else
            return false;
    },

    /* Método que crea una unidad de medida dado el nameUnitedMeasured */
    async createUnitedMeasured(body) {
        const err = await this.validateUnitedMeasured(body, 0, 1);
        if (err)
            return err;
        await UnitedMeasured.create(body);
    },

    /* Método que encuentra a una unidad de medida por el idUnitedMeasured. */
    /* Devuelve un objeto json de tipo UnitedMeasured. */
    async findUnitedMeasuredById(id) {
        const err = await this.validateUnitedMeasured(0, id, 2);
        if (err)
            return err;
        const unitedMeasured = await UnitedMeasured.findByPk(id);
        return unitedMeasured;
    },

    /* Método que encuentra a todos los registros de UnitedMeasured. */
    /* Devuelve un array de objetos json de tipo Role. */
    async findAllUnitedMeasured() {
        const unitedMeasured = await UnitedMeasured.findAll({ where: {} });
        return unitedMeasured;
    },

    /* Actualizar datos de una unidad de medida dado el idUnitedMeasured y nameUnitedMeasured */
    async updateUnitedMeasured(body, id) {
        const err = await this.validateUnitedMeasured(body, id, 3);
        if (err)
            return err;
        unitedMeasured = await UnitedMeasured.findByPk(id);
        if (unitedMeasured != null) {
            await UnitedMeasured.update({
                NameUnitedMeasured: body.NameUnitedMeasured
            }, {
                where: { idUnitedMeasured: id }
            }).catch(function() {
                console.log("Promise Rejected");
            });
        }
    },

    /* Método que elimina una unidad de meidad dado el idUnitedMeasured */
    async deleteUnitedMeasured(id) {
        const err = await this.validateUnitedMeasured(0, id, 4);
        if (err)
            return err;
        await UnitedMeasured.destroy({ where: { idUnitedMeasured: id } });
    },

    /* Método que encuentra a una unidad de medida por el nameUnitedMeasured. */
    /* Devuelve un objeto json de tipo UnitedMeasured. */
    async findUnitedMeasured(nameUnitedMeasured) {
        const unitedMeasured = await UnitedMeasured.findOne({ where: { NameUnitedMeasured: nameUnitedMeasured } });
        return unitedMeasured;
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