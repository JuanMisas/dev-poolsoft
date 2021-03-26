const Sequelize = require('sequelize');
const PAY = require('../models/ps_PayType');
const server = require('../server/server');
const {check, validationResult} = require('express-validator');
const { validate } = require('../server/connection');
const { INTEGER } = require('sequelize');


module.exports = {

    async validePay(NP, id, tipo){
        var errores = [];
        if (tipo > 1) {
            var x1 = await PAY.count({where : {'idPayType' : id}});
            if (x1 == 0) 
                errores.push('El ID No existe');
        }
        if (tipo == 1 || tipo == 2){
            if (tipo == 1) {
                var x1 = await PAY.count({where : {'idPayType' : NP.idPayType}});
                if (x1 > 0) 
                    errores.push('El ID ya existe');
            }    
            if ((NP.idPayType == '' || NP.idPayType == undefined) ){
                errores.push('El ID no puede ser nulo');
            }
            if (NP.NamePayType == '' || NP.NamePayType == undefined) {
                errores.push('El Nombre no puede ser nulo');
            }
        }
        const len = errores.length;
        if (len > 0 )
            return errores;
        else
            return false;
    },

    async findPayTypeOne(id) {
        const err = (await this.validePay({},id,5));
        if (err) {
            return err;
        }
      const PayType = await PAY.findByPk(id);
        return PayType;
    },

    async findAllPayType(){
        const PayType = await PAY.findAll({where : {}});
        return PayType;
    },

    async CreatePayType(NewPaytype) {
          const err = await this.validePay(NewPaytype,0,1);
          if (err) {
              return err;
          }
          const PayType = await PAY.create(NewPaytype);
          return PayType;
    },

    async UpdatePayType(body, id) {
        const err = await this.validePay(body,id,2);
        if (err) {
            return err;
        }
        const PayType = await PAY.update(body , {where : { idPayType : id}});
        return PayType;
    },

    async DeletePayType(id) {
        const err = await this.validePay({},id,3);
        if (err) {
            return err;
        }
      const PayType = await PAY.destroy({where : { idPayType : id}});
        return PayType;
    },

};  