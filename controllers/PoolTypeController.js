const Sequelize = require('sequelize');
const PT = require('../models/ps_PoolType');
const server = require('../server/server');
const {check, validationResult} = require('express-validator');

var validator = [
    check('idTypePool','xxx').not().notEmpty(),
    check('NameTypePool','yyy').not().notEmpty(),
];

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
          console.log('Entreo a 1');
          const err = validationResult(NewPooltype);
          if (!err.isEmpty() ){
              return {err : err.array()};
          }
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