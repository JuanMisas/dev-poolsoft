const Sequelize = require('sequelize');
const ClientType = require('../models/ps_clienttype');
const server = require('../server/server');

module.exports = {

    async validateClientType(body, id, tipo){
        var errores = [];
        if (tipo == 1) {
            if (body.idClientType == '' || body.idClientType == undefined)
                errores.push('El ID no puede ser nulo');
            if (errores.length == 0) {
                var x1 = await ClientType.count({where : {'idClientType' : body.idClientType}});
                if (x1 > 0) 
                    errores.push('El ID ya existe');
            }
            if (body.NameClientType == '' || body.NameClientType == undefined)
                errores.push('El Nombre no puede ser nulo');
        }
        if (tipo == 2) {
            if (id == '' || id == undefined)
                errores.push('El ID no puede ser nulo');
            if (errores.length == 0) {
                var x1 = await ClientType.count({where : {'idClientType' : id}});
                if (x1 == 0)
                    errores.push('El ID No existe');
            }
        }
        if (tipo == 3) {
            if (id == '' || id == undefined)
                errores.push('El ID no puede ser nulo');
            if (errores.length == 0) {
                var x1 = await ClientType.count({where : {'idClientType' : id}});
                if (x1 == 0)
                    errores.push('El ID No existe');
            }
            if (body.NameClientType == '' || body.NameClientType == undefined)
                errores.push('El Nombre no puede ser nulo');
        }
        if (tipo == 4) {
            if (id == '' || id == undefined)
                errores.push('El ID no puede ser nulo');
            if (errores.length == 0) {
                var x1 = await ClientType.count({where : {'idClientType' : id}});
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
    
    /* Método que crea un tipo de cliente dado el nameClientType /*/
    async createClientType(body) {
        const err = await this.validateClientType(body,0,1);
        if (err)
            return err;
        await ClientType.create(body);
    },

    /* Método que encuentra a un tipo de cliente por el idClientType. */ 
    /* Devuelve un objeto json de tipo ClientType. /*/
    async findClientTypeById(id) {
        const err = await this.validateClientType(0,id,2);
        if (err)
            return err;
        const clientType = await ClientType.findByPk(id);
        return clientType;
    },

    /* Método que encuentra a todos los registros de ClientType. */ 
    /* Devuelve un arrray de objetos json de tipo ClientType. /*/
    async findAllClientType() {
        const clientType = await ClientType.findAll({where : {}});
        return clientType;
    },

    /* Actualizar datos de un tipo de cliente dado el idClientType y nameClientType /*/
    async updateClientType(body, id) {
        const err = await this.validateClientType(body,id,3);
        if (err)
            return err;
        clientType = await ClientType.findByPk(id);
        if (clientType != null) {
            await ClientType.update({idClientType: id, NameClientType: body.NameClientType} , { 
                where : { idClientType: id}
            }).catch(function () {
                console.log("Promise Rejected");
           });
        }
    },

    /* Método que elimina un tipo de cliente dado el idClientType /*/
    async deleteClientType(id) {
        const err = await this.validateClientType(0,id,4);
        if (err)
            return err;
        await ClientType.destroy({ where: { idClientType: id } });
    },

    /* Método que encuentra a un tipo de cliente por el nameClientType. */ 
    /* Devuelve un objeto json de tipo ClientType. */
    async findClientType(nameClientType) {
        const clientType = await ClientType.findOne({ where: { NameClientType: nameClientType } });
        return clientType;
    }

};