const Sequelize = require('sequelize');
const Supplies = require('../models/ps_supplies');
const server = require('../server/server');

module.exports = {
    /* Método que crea un insumo dados el NameSupply, IdUnitedMeasuredSupply y DescriptionSupply */
    async createSupply(nameSupply, idUnitedMeasuredSupply, descriptionSupply) {
        await Supplies.create({ NameSupplies: nameSupply, IdUnitedMeasuredSupplies: idUnitedMeasuredSupply, DescriptionSupplies: descriptionSupply });
    },

    /* Método que encuentra un insumo por el nameSupply. */ 
    /* Devuelve un objeto json de tipo Supplies. */
    async findSupply(nameSupply) {
        const supply = await Supplies.findOne({ where: { NameSupplies: nameSupply } });
        return supply;
    },

    /* Método que encuentra un insumo por el idSupply. */ 
    /* Devuelve un objeto json de tipo Supplies. */
    async findSupplyById(id) {
        const supply = await Supplies.findByPk(id);
        return supply;
    },

    /* Método que encuentra a todos los registros de Supply. */ 
    /* Devuelve un array de objetos json de tipo Supply. */
    async findAllSupply() {
        const supply = await Supply.findAll({where : {}});
        return supply;
    },

    /* Actualizar datos de un insumo dado el idSupply */
    async updateSupply(id, nameSupply, idUnitedMeasuredSupply, descriptionSupply) {
        supply = await Supplies.findByPk(id);
        if (supply != null) {
            await Supplies.update({
                NameSupplies: nameSupply,
                IdUnitedMeasuredSupplies: idUnitedMeasuredSupply,
                DescriptionSupplies: descriptionSupply
            }, { 
                where : { idSupplies: id}
            }).catch(function () {
                console.log("Promise Rejected");
           });
        }
    },

    /* Método que elimina un insumo dado el idSupply */
    async deleteSupply(id) {
        await Supplies.destroy({ where: { idSupplies: id } });
    }

};