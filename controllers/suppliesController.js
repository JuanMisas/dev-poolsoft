const Sequelize = require('sequelize');
const Supplies = require('../models/ps_supplies');
const UnitedMeasured = require('../models/ps_unitedmeasured');
const server = require('../server/server');

module.exports = {

    async validateSupplies(body, id, tipo){
        var errores = [];
        isUnitedMeasured = false;
        if (tipo == 1) {
            if (body.idSupplies != undefined) {
                var x1 = await Supplies.count({where : {'idSupplies' : body.idSupplies}});
                if (x1 > 0) 
                    errores.push('El ID ya existe');
            }
            if (body.NameSupplies == '' || body.NameSupplies == undefined)
                errores.push('El Nombre no puede ser nulo');
            if (body.IdUnitedMeasuredSupplies == '' || body.IdUnitedMeasuredSupplies == undefined)
                errores.push('La unidad de medida no puede ser nula');
                isUnitedMeasured = true;
            if (isUnitedMeasured) {
                var x1 = await UnitedMeasured.count({where : {'idUnitedMeasured' : body.IdUnitedMeasuredSupplies}});
                if (x1 == 0)
                    errores.push('La unidad de medida no existe');
            }
            if (body.DescriptionSupplies == '' || body.DescriptionSupplies == undefined)
                errores.push('La descripción no puede ser nula');
        }
        if (tipo == 2) {
            if (id == '' || id == undefined)
                errores.push('El ID no puede ser nulo');
            if (errores.length == 0) {
                var x1 = await Supplies.count({where : {'idSupplies' : id}});
                if (x1 == 0)
                    errores.push('El ID No existe');
            }
        }
        if (tipo == 3) {
            if (id == '' || id == undefined)
                errores.push('El ID no puede ser nulo');
            if (errores.length == 0) {
                var x1 = await Supplies.count({where : {'idSupplies' : id}});
                if (x1 == 0)
                    errores.push('El ID No existe');
            }
            if (body.NameSupplies == '' || body.NameSupplies == undefined)
                errores.push('El Nombre no puede ser nulo');
            if (body.IdUnitedMeasuredSupplies == '' || body.IdUnitedMeasuredSupplies == undefined)
                errores.push('La unidad de medida no puede ser nula');
                isUnitedMeasured = true;
            if (isUnitedMeasured) {
                var x1 = await UnitedMeasured.count({where : {'idUnitedMeasured' : body.IdUnitedMeasuredSupplies}});
                if (x1 == 0)
                    errores.push('La unidad de medida no existe');
            }
            if (body.DescriptionSupplies == '' || body.DescriptionSupplies == undefined)
                errores.push('La descripción no puede ser nula');
        }
        if (tipo == 4) {
            if (id == '' || id == undefined)
                errores.push('El ID no puede ser nulo');
            if (errores.length == 0) {
                var x1 = await Supplies.count({where : {'idSupplies' : id}});
                if (x1 == 0)
                    errores.push('El ID No existe');
            }
        }
        const len = errores.length;
        if (len > 0 )
            return errores;
        else
            return false;
    },

    /* Método que crea un insumo dados el NameSupply, IdUnitedMeasuredSupply y DescriptionSupply */
    async createSupply(body) {
        const err = await this.validateSupplies(body,0,1);
        if (err)
            return err;
        await Supplies.create(body);
    },

    /* Método que encuentra un insumo por el idSupply. */ 
    /* Devuelve un objeto json de tipo Supplies. */
    async findSupplyById(id) {
        const err = await this.validateSupplies(0,id,2);
        if (err)
            return err;
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
    async updateSupply(body, id) {
        const err = await this.validateSupplies(body,id,3);
        if (err)
            return err;
        supply = await Supplies.findByPk(id);
        if (supply != null) {
            await Supplies.update({
                NameSupplies: body.NameSupplies,
                IdUnitedMeasuredSupplies: body.IdUnitedMeasuredSupplies,
                DescriptionSupplies: body.DescriptionSupplies
            }, { 
                where : { idSupplies: id}
            }).catch(function () {
                console.log("Promise Rejected");
           });
        }
    },

    /* Método que elimina un insumo dado el idSupply */
    async deleteSupply(id) {
        const err = await this.validateSupplies(0,id,4);
        if (err)
            return err;
        await Supplies.destroy({ where: { idSupplies: id } });
    },

    /* Método que encuentra un insumo por el nameSupply. */ 
    /* Devuelve un objeto json de tipo Supplies. */
    async findSupply(nameSupply) {
        const supply = await Supplies.findOne({ where: { NameSupplies: nameSupply } });
        return supply;
    }

};