const Sequelize = require('sequelize');
const ClientType = require('../models/ps_clienttype');
const server = require('../server/server');

module.exports = {
    /* Método que crea un tipo de cliente dado el nameClientType */
    async createClientType(nameClientType) {
        await ClientType.create({ NameClientType: nameClientType });
    },

    /* Método que encuentra a un tipo de cliente por el nameClientType. */ 
    /* Devuelve un objeto json de tipo ClientType. */
    async findClientType(nameClientType) {
        const clientType = await ClientType.findOne({ where: { NameClientType: nameClientType } });
        return clientType;
    },

    /* Método que encuentra a un tipo de cliente por el idClientType. */ 
    /* Devuelve un objeto json de tipo ClientType. */
    async findClientTypeById(id) {
        const clientType = await ClientType.findByPk(id);
        return clientType;
    },

    /* Actualizar datos de un tipo de cliente dado el idClientType y nameClientType */
    async updateClientType(id, nameClientType) {
        clientType = await ClientType.findByPk(id);
        if (clientType != null) {
            await ClientType.update({
                NameClientType: nameClientType
            }, { 
                where : { idClientType: id}
            }).catch(function () {
                console.log("Promise Rejected");
           });
        }
    },

    /* Método que elimina un tipo de cliente dado el idClientType */
    async deleteClientType(id) {
        await ClientType.destroy({ where: { idClientType: id } });
    }

};