const Sequelize = require('sequelize');
const PAY = require('../models/ps_PayType');
const server = require('../server/server');
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
                if (NP.idPayType != undefined) {
                    var x1 = await PAY.count({where : {'idPayType' : NP.idPayType}});
                    if (x1 > 0) 
                        errores.push('El ID ya existe');
                }
            }    
            if (NP.idPayType == undefined && tipo != 1){
                errores.push('El ID no puede ser nulo');
            }
            if (NP.NamePayType == '' || NP.NamePayType == undefined) {
                errores.push('El Nombre no puede ser nulo');
            }
        }
        if ((NP.PeriodicityPayType == '' || NP.PeriodicityPayType == undefined) && (tipo == 1 || tipo == 2) ){
            errores.push('La periodicidad debe tener un valor')
        }
        if (NP.PeriodicityPayType < 0 && (tipo == 1 || tipo == 2) ){
            errores.push('La periodicidad de pago no debe ser menor de cero')
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
        if (body.idPayType == ''){
            body.idPayType = id;
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