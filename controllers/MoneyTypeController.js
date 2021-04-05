const Sequelize = require('sequelize');
const MT = require('../models/ps_moneytype');
const server = require('../server/server');
const {check, validationResult} = require('express-validator');
const { validate } = require('../server/connection');
const { INTEGER } = require('sequelize');
const { update } = require('../models/ps_moneytype');


module.exports = {

    async valideMoney(NM, id, tipo){
        var errores = [];
        if (tipo > 1) {
            var x1 = await MT.count({where : {'idTypeMoney' : id}});
            if (x1 == 0) 
                errores.push('El ID No existe');
        }
        if (tipo == 1 || tipo == 2){
            if (tipo == 1) {
                var x1 = await MT.count({where : {'idTypeMoney' : NM.idTypeMoney}});
                if (x1 > 0) 
                    errores.push('El ID ya existe');
            }    
            if (NM.idTypeMoney == undefined ){
                errores.push('El ID no puede ser nulo');
            }
            if (NM.NameTypeMoney == '' || NM.NameTypeMoney == undefined) {
                errores.push('El Nombre no puede ser nulo');
            }
        }
        const len = errores.length;
        if (len > 0 )
            return errores;
        else
            return false;
    },

    async findMoneyTypeOne(id) {
        const err = (await this.valideMoney({},id,5));
        if (err) {
            return err;
        }
      const MoneyType = await MT.findByPk(id);
        return MoneyType;
    },

    async findAllMoneyType(){
        const MoneyType = await MT.findAll({where : {}});
        return MoneyType;
    },

    async CreateMoneyType(NewMoneytype) {
          const err = await this.valideMoney(NewMoneytype,0,1);
          if (err) {
              return err;
          }
          const MoneyType = await MT.create(NewMoneytype);
          return MoneyType;
    },

    async UpdateMoneyType(body, id) {
        const err = await this.valideMoney(body,id,2);
        if (err) {
            return err;
        }
        console.log(body);
        console.log(id);
        console.log(typeof(body.idTypeMoney))
        if (body.idTypeMoney == '') {
            body.idTypeMoney = id;
        }
        const MoneyType = await MT.update(body , {where : { idTypeMoney : id}});
        return MoneyType;
    },

    async DeleteMoneyType(id) {
        const err = await this.valideMoney({},id,3);
        if (err) {
            return err;
        }
      const MoneyType = await MT.destroy({where : { idTypeMoney : id}});
        return MoneyType;
    },

};  