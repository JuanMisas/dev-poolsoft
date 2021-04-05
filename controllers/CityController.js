const Sequelize = require('sequelize');
const CITY = require('../models/ps_city');
const server = require('../server/server');
const { validate } = require('../server/connection');
const { INTEGER } = require('sequelize');
const State = require('./stateController.js')


module.exports = {

    async validecity(NCT, id, tipo){
        var errores = [];
        var len = 0;
        if (tipo > 1) {
            var x1 = await CITY.count({where : {'IdCity' : id}});
            if (x1 == 0) 
                errores.push('El ID No existe');
        } 
        if (tipo == 1 || tipo == 2){
            if (tipo == 1) {
                var x1 = await CITY.count({where : {'IdCity' : NCT.IdCity}});
                if (x1 > 0) 
                    errores.push('El ID ya existe');
            }    
            if (NCT.IdCity == undefined){
                errores.push('El ID no puede ser nulo');
            }
            if (NCT.NameCity == '' || NCT.NameCity == undefined) {
                errores.push('El Nombre no puede ser nulo');
            }
            const co = await State.findStateOne(NCT.IdStateCity);
            const len1 = co.length; 
            if (len1 > 0 ) {
                errores.push('El Estado no exite')
            }
        }
        len = errores.length;
        if (len > 0 )
            return errores;
        else
            return false;
    },

    async findCityOne(id) {
        const err = (await this.validecity({},id,5));
        if (err) {
            return err;
        }
      const City = await CITY.findByPk(id);
        return City;
    },

    async findAllCity(){
        const City = await CITY.findAll({where : {}});
        return City;
    },

    async CreateCity(NewCity) {
          const err = await this.validecity(NewCity,0,1);
          if (err) {
              return err;
          }
          const City = await CITY.create(NewCity);
          return City;
    },

    async UpdateCity(body, id) {
        const err = await this.validecity(body,id,2);
        if (err) {
            return err;
        }
        if (body.IdCity == ''){
            body.city = id;
        }
        const City = await CITY.update(body , {where : { IdCity : id}});
        return City;
    },

    async DeleteCity(id) {
        const err = await this.validecity({},id,3);
        if (err) {
            return err;
        }
      const City = await CITY.destroy({where : { IdCity : id}});
        return City;
    },

};  