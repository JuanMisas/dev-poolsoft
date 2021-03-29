const Sequelize = require('sequelize');
const UnitedMeasured = require('../models/ps_unitedmeasured');
const server = require('../server/server');

module.exports = {
    /* Método que crea una unidad de medida dado el nameUnitedMeasured */
    async createUnitedMeasured(nameUnitedMeasured) {
        await UnitedMeasured.create({ NameUnitedMeasured: nameUnitedMeasured });
    },

    /* Método que encuentra a una unidad de medida por el nameUnitedMeasured. */ 
    /* Devuelve un objeto json de tipo UnitedMeasured. */
    async findUnitedMeasured(nameUnitedMeasured) {
        const unitedMeasured = await UnitedMeasured.findOne({ where: { NameUnitedMeasured: nameUnitedMeasured } });
        return unitedMeasured;
    },

    /* Método que encuentra a una unidad de medida por el idUnitedMeasured. */ 
    /* Devuelve un objeto json de tipo UnitedMeasured. */
    async findUnitedMeasuredById(id) {
        const unitedMeasured = await UnitedMeasured.findByPk(id);
        return unitedMeasured;
    },

    /* Método que encuentra a todos los registros de UnitedMeasured. */ 
    /* Devuelve un array de objetos json de tipo Role. */
    async findAllUnitedMeasured() {
        const unitedMeasured = await UnitedMeasured.findAll({where : {}});
        return unitedMeasured;
    },

    /* Actualizar datos de una unidad de medida dado el idUnitedMeasured y nameUnitedMeasured */
    async updateUnitedMeasured(id, nameUnitedMeasured) {
        unitedMeasured = await UnitedMeasured.findByPk(id);
        if (unitedMeasured != null) {
            await UnitedMeasured.update({
                NameUnitedMeasured: nameUnitedMeasured
            }, { 
                where : { idUnitedMeasured: id}
            }).catch(function () {
                console.log("Promise Rejected");
           });
        }
    },

    /* Método que elimina una unidad de meidad dado el idUnitedMeasured */
    async deleteUnitedMeasured(id) {
        await UnitedMeasured.destroy({ where: { idUnitedMeasured: id } });
    }

};