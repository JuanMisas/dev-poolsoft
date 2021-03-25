const Sequelize = require('sequelize');
const PT = require('../models/ps_PoolType');
const server = require('../server/server');
const {check, validationResult} = require('express-validator');
const { validate } = require('../server/connection');
const { INTEGER } = require('sequelize');


module.exports = {

    async validePool(NP, id, tipo){
        if (tipo == 1){
            if ((NP.idTypePool == '' || NP.idTypePool == undefined) && tipo == 1){
                return 'El ID no puede ser nulo';
            }
            var x1 = await PT.count({where : {'idTypePool' : NP.idTypePool}});
            if (x1 > 0) 
                return 'El ID ya existe';

            if (NP.NameTypePool == '' || NP.NameTypePool == undefined) {
                return 'El Nombre no puede ser nulo';
            }
        }
        //
        if (tipo > 1) {
            var x1 = await PT.count({where : {'idTypePool' : id}});
            if (x1 == 0) 
                return 'El ID No existe';
        }
        if (tipo == 2){
            if (NP.NameTypePool == '' || NP.NameTypePool == undefined) {
                return 'El Nombre no puede ser nulo';
            }
        }       
        return false;
    },

    async findPoolTypeOne(id) {
        const err = (await this.validePool({},id,5));
        if (err) {
            return err;
        }
      const PoolType = await PT.findByPk(id);
        return PoolType;
    },

    async findAllPoolType(){
        const PoolType = await PT.findAll({where : {}});
        return PoolType;
    },

    async CreatePoolType(NewPooltype) {
          const err = await this.validePool(NewPooltype,0,1);
          if (err) {
              return err;
          }
          const PoolType = await PT.create(NewPooltype);
          return PoolType;
    },

    async UpdatePoolType(body, id) {
        const err = await this.validePool(body,id,2);
        if (err) {
            return err;
        }
        const PoolType = await PT.update(body , {where : { idTypePool : id}});
        return PoolType;
    },

    async DeletePoolType(id) {
        const err = await this.validePool({},id,3);
        if (err) {
            return err;
        }
      const PoolType = await PT.destroy({where : { idTypePool : id}});
        return PoolType;
    },

};  