const Sequelize = require('sequelize');
const PT = require('../models/ps_PoolType');
const server = require('../server/server');

module.exports = {
    
    async findPoolTypeOne(id) {
        const PoolType = await PT.findByPk(id);
        return PoolType;
    },

    async findAllPoolType(){
        const PoolType = await PT.findAll({where : {}});
        return PoolType;
    },

    async CretePoolType(NewPooltype) {
          const PoolType = await PT.create(NewPooltype);
          return PoolType;
    },

    async UpdatePoolType(body, id) {
        const PoolType = await PT.update(body , {where : { idTypePool : id}});
        return PoolType;
    },

    async DeletePoolType(id) {
        const PoolType = await PT.destroy({where : { idTypePool : id}});
        return PoolType;
    },

};