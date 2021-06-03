const Sequelize = require('sequelize');
const Supplies = require('../models/ps_supplies');
const UnitedMeasured = require('../controllers/unitedMeasuredController');
const server = require('../server/server');

module.exports = {

    async validateSupplies(tipo,  id, body){

        err = [];

        if (tipo == 'find_one') {
    
            if (id == undefined) {
                err.push('El ID del producto no puede ser nulo.');
            }
            if (!(await this.existsIdSupply(id))) {
                err.push('El producto no existe.');
            }
            return err;
    
        } else if (tipo == 'find_all') {
    
            return err;
    
        } else if (tipo == 'create') {
            if (body.idSupplies) {
                if (await this.existsIdSupply(body.idSupplies)) {
                    err.push('El producto ya existe.');
                }
            }
            if (body.NameSupplies == null || body.NameSupplies == "") {
                err.push('El nombre no puede ser vacío.');
            }

            if (!await UnitedMeasured.existsIdUnitedMeasured(body.IdUnitedMeasuredSupplies)){
                err.push('La unidad de medidad no existe');
            }
            return err;
    
        } else if (tipo == 'update') {
            if (id == undefined) {
                err.push('El ID del producto no puede ser nulo.');
            }
            if (!(await this.existsIdSupply(id))) {
                err.push('El producto no existe.');
            }
            if (body.NameSupplies == null || body.NameSupplies == "") {
                err.push('El nombre no puede ser vacío.');
            }
            if (!await UnitedMeasured.existsIdUnitedMeasured(body.IdUnitedMeasuredSupplies)){
                err.push('La unidad de medidad no existe');
            }
            return err;
    
        } else if (tipo == 'delete') {
    
            if (id == undefined) {
                err.push('El ID del producto no puede ser nulo.');
            }
            if (!(await this.existsIdSupply(id))) {
                err.push('El Id del producto No existe.');
            }
            return err;
    
        }
    },
    
    /* Método que encuentra un insumo por el idSupply. */ 
    /* Devuelve un objeto json de tipo Supplies. */
    async findSupplyById(id) {
        const err = await this.validateSupplies('find_one',id,{});
        if (err.length > 0)
            throw err;
        const supply = await Supplies.findByPk(id);
        return supply;
    },

    /* Método que encuentra a todos los registros de Supply. */ 
    /* Devuelve un array de objetos json de tipo Supply. */
    async findAllSupply() {
        const supplies = await Supplies.findAll({where : {}});
        return supplies;
    },

/* Método que crea un insumo dados el NameSupply, IdUnitedMeasuredSupply y DescriptionSupply */

    async createSupply(body) {
        const err = await this.validateSupplies('create', {}, body);
        if (err.length > 0 )
            throw err;
        const supplies = await Supplies.create(body);
        return supplies;
    },

    /* Actualizar datos de un insumo dado el idSupply */
    async updateSupply(body, id) {
        const err = await this.validateSupplies('update', id, body);
        if (err.length > 0)
            throw err;

        body.idSupplies = id;
        const supplies = await Supplies.update(body, { where: { idSupplies : id } });
        if (supplies[0] == 1) {
            return true;
        }
    
    },

    /* Método que elimina un insumo dado el idSupply */
    async deleteSupply(id) {
        const err = await this.validateSupplies('delete', id, {});
        if (err.length > 0)
            throw  err; 

        const supplies = await Supplies.destroy({ where: { idSupplies: id } });
        if (supplies == 1)
            return true;
    },

    /* Método que encuentra un insumo por el nameSupply. */ 
    /* Devuelve un objeto json de tipo Supplies. */
    async existsIdSupply(id) {
        aux = await Supplies.findByPk(id).catch(function() {
           console.log("Promise Rejected");
       });
       if (aux == null) {
           return false;
       } else {
           return true;
       }
   }

};