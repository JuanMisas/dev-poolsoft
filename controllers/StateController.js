const Sequelize = require('sequelize');
const STATE = require('../models/ps_state');
const server = require('../server/server');
const { validate } = require('../server/connection');
const { INTEGER } = require('sequelize');
const Country = require('./countryController.js')


module.exports = {

    async validestate(NST, id, tipo){
        var errores = [];
        var len = 0;

        if (tipo > 1) {
            var x1 = await STATE.count({where : {'IdState' : id}});
            if (x1 == 0) 
                errores.push('El ID No existe');
        } 
        if (tipo == 1 || tipo == 2){
            if (tipo == 1) {
                if (NST.IdState != undefined) {
                    var x1 = await STATE.count({where : {'IdState' : NST.IdState}});
                    if (x1 > 0) 
                        errores.push('El ID ya existe');
                }
            }    
            if (NST.IdState == undefined && tipo != 1){
                errores.push('El ID no puede ser nulo');
            }
            if (NST.NameState == '' || NST.NameState == undefined) {
                errores.push('El Nombre no puede ser nulo');
            }
            const co = await Country.findCountryOne(NST.IdCountryState);
            const len1 = co.length; 
            if (len1 > 0 ) {
                errores.push('El pais no exite')
            }
        }
        len = errores.length;
        if (len > 0 )
            return errores;
        else
            return false;
    },

    async findStateOne(id) {
        const err = (await this.validestate({},id,5));
        if (err) {
            return err;
        }
      const State = await STATE.findByPk(id);
        return State;
    },

    async findAllState(){
        const State = await STATE.findAll({where : {}});
        return State;
    },

    async CreateState(NewState) {
          const err = await this.validestate(NewState,0,1);
          if (err) {
              return err;
          }
          const State = await STATE.create(NewState);
          return State;
    },

    async UpdateState(body, id) {
        const err = await this.validestate(body,id,2);
        if (err) {
            return err;
        }
        if (body.IdState == '') {
            body.IdState = id;
        }
        const State = await STATE.update(body , {where : { IdState : id}});
        return State;
    },

    async DeleteState(id) {
        const err = await this.validestate({},id,3);
        if (err) {
            return err;
        }
      const State = await STATE.destroy({where : { IdState : id}});
        return State;
    },

};  