const Sequelize = require('sequelize');
const IdClientType = require('../models/ps_idclienttype');
const server = require('../server/server');

module.exports = {
    /* Método que crea un tipo de cliente dado el nameIdClientType */
    async createIdClientType(nameIdClientType) {
        await IdClientType.create({ NameIdClientType: nameIdClientType });
    },

    /* Método que encuentra a un tipo de cliente por el nameIdClientType. */ 
    /* Devuelve un objeto json de tipo IdClientType. */
    async findIdClientType(nameIdClientType) {
        const idClientType = await IdClientType.findOne({ where: { NameIdClientType: nameIdClientType } });
        return idClientType;
    },

    /* Método que encuentra a un tipo de cliente por el IdIdClientType. */ 
    /* Devuelve un objeto json de tipo IdClientType. */
    async findIdClientTypeById(id) {
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
    async updateIdClientType(id, nameIdClientType) {
        idClientType = await IdClientType.findByPk(id);
        if (idClientType != null) {
            await IdClientType.update({
                NameIdClientType: nameIdClientType
            }, { 
                where : { IdIdClientType: id}
            }).catch(function () {
                console.log("Promise Rejected");
           });
        }
    },

    /* Método que elimina un tipo de cliente dado el IdIdClientType */
    async deleteIdClientType(id) {
        await IdClientType.destroy({ where: { IdIdClientType: id } });
    }

};