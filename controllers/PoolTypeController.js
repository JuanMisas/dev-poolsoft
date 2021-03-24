const Sequelize = require('sequelize');
const PT = require('../models/ps_PoolType');
const server = require('../server/server');
const {check, validationResult} = require('express-validator');
const { validate } = require('../server/connection');
const { INTEGER } = require('sequelize');


module.exports = {

    async validePool(NP, tipo){
        console.log(NP);
        if ((NP.idTypePool == '' || NP.idTypePool == undefined) && tipo == 1){
            return 'El ID no puede ser nulo';
        }
        if (NP.idTypePool !='' ){
            var x1 = await PT.count({where : {idTypePool : NP.idTypePool}});
            console.log('x1',x1,tipo);
            if (x1 > 0) {
                console.log ('entreo a 1');
                if (tipo == 1) {
                    console.log ('entro a 2');
                return 'El Id ya existe';
                }
            }
            else if (tipo > 1 ) 
                return 'El ID no existe';      
        }
        if ((NP.NameTypePool == '' || NP.NameTypePool == undefined) && (tipo == 1 || tipo == 2)){
            return 'El Nombre no puede ser nulo';
        }
        return 'salio bien';
    },

    async findPoolTypeOne(id) {
        const PoolType = await PT.findByPk(id);
        return PoolType;
    },

    async findAllPoolType(){
        const PoolType = await PT.findAll({where : {}});
        return PoolType;
    },

    async CreatePoolType(NewPooltype) {
          const err = this.validePool(NewPooltype,1);
          if (err == 'salio bien') {
              return err;
          }
          const PoolType = await PT.create(NewPooltype);
          return PoolType;
    },

    async UpdatePoolType(body, id) {
        const err = this.validePool(body,2);
        if (err != '') {
            return err;
        }
        const PoolType = await PT.update(body , {where : { idTypePool : id}});
        return PoolType;
    },

    async DeletePoolType(id) {
        const err = this.validePool(id,3);
        if (err != '') {
            return err;
        }
      const PoolType = await PT.destroy({where : { idTypePool : id}});
        return PoolType;
    },


};