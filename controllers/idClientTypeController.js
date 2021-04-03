const Sequelize = require('sequelize');
const IdClientType = require('../models/ps_idclienttype');
const server = require('../server/server');

module.exports = {

    async validateIdClientType(body, id, tipo){
        var errores = [];
        if (tipo == 1) {
            if (body.IdIdClientType == '' || body.IdIdClientType == undefined)
                errores.push('El ID no puede ser nulo');
            if (errores.length == 0) {
                var x1 = await IdClientType.count({where : {'IdIdClientType' : body.IdIdClientType}});
                if (x1 > 0) 
                    errores.push('El ID ya existe');
            }
            if (body.NameIdClientType == '' || body.NameIdClientType == undefined)
                errores.push('El Nombre no puede ser nulo');
        }
        if (tipo == 2) {
            if (id == '' || id == undefined)
                errores.push('El ID no puede ser nulo');
            if (errores.length == 0) {
                var x1 = await IdClientType.count({where : {'IdIdClientType' : id}});
                if (x1 == 0)
                    errores.push('El ID No existe');
            }
        }
        if (tipo == 3) {
            if (id == '' || id == undefined)
                errores.push('El ID no puede ser nulo');
            if (errores.length == 0) {
                var x1 = await IdClientType.count({where : {'IdIddClientType' : id}});
                if (x1 == 0)
                    errores.push('El ID No existe');
            }
            if (body.NameIdClientType == '' || body.NameIdClientType == undefined)
                errores.push('El Nombre no puede ser nulo');
        }
        if (tipo == 4) {
            if (id == '' || id == undefined)
                errores.push('El ID no puede ser nulo');
            if (errores.length == 0) {
                var x1 = await IdClientType.count({where : {'IdIdClientType' : id}});
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

    /* Método que crea un tipo de cliente dado el nameIdClientType */
    async createIdClientType(body) {
        const err = await this.validateIdClientType(body,0,1);
        if (err)
            return err;
        await IdClientType.create(body);
    },

    /* Método que encuentra a un tipo de cliente por el IdIdClientType. */ 
    /* Devuelve un objeto json de tipo IdClientType. */
    async findIdClientTypeById(id) {
        const err = await this.validateIdClientType(0,id,2);
        if (err)
            return err;
        const idClientType = await IdClientType.findByPk(id);
        return idClientType;
    },
    
    /* Método que encuentra a todos los registros de ClientTypeById. */ 
    /* Devuelve un array de objetos json de tipo ClientTypeById. */
    async findAllClientTypeById() {
        const clientTypeById = await clientTypeById.findAll({where : {}});
        return clientTypeById;
    },

    /* Actualizar datos de un tipo de cliente dado el IdIdClientType y nameIdClientType */
    async updateIdClientType(body, id) {
        const err = await this.validateIdClientType(body,id,3);
        if (err)
            return err;
        idClientType = await IdClientType.findByPk(id);
        if (idClientType != null) {
            await IdClientType.update({NameIdClientType: body.NameIdClientType}, { 
                where : { IdIdClientType: id}
            }).catch(function () {
                console.log("Promise Rejected");
           });
        }
    },

    /* Método que elimina un tipo de cliente dado el IdIdClientType */
    async deleteIdClientType(id) {
        const err = await this.validateIdClientType(0,id,4);
        if (err)
            return err;
        await IdClientType.destroy({ where: { IdIdClientType: id } });
    },

    /* Método que encuentra a un tipo de cliente por el nameIdClientType. */ 
    /* Devuelve un objeto json de tipo IdClientType. */
    async findIdClientType(nameIdClientType) {
        const idClientType = await IdClientType.findOne({ where: { NameIdClientType: nameIdClientType } });
        return idClientType;
    }

};