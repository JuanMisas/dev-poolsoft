const Sequelize = require('sequelize');
const COUNTRY = require('../models/ps_Country');
const server = require('../server/server');
const { validate } = require('../server/connection');
const { INTEGER } = require('sequelize');


module.exports = {

    async valideCountry(NCO, id, tipo){
        var errores = [];
        if (tipo > 1) {
            var x1 = await COUNTRY.count({where : {'IdCountry' : id}});
            if (x1 == 0) 
                errores.push('El ID No existe');
        } 
        if (tipo == 1 || tipo == 2){
            if (tipo == 1) {
                var x1 = await COUNTRY.count({where : {'IdCountry' : NCO.IdCountry}});
                if (x1 > 0) 
                    errores.push('El ID ya existe');
            }    
            if ((NCO.IdCountry == '' || NCO.IdCountry == undefined) ){
                errores.push('El ID no puede ser nulo');
            }
            if (NCO.NameCountry == '' || NCO.NameCountry == undefined) {
                errores.push('El Nombre no puede ser nulo');
            }
        }
        const len = errores.length;
        if (len > 0 )
            return errores;
        else
            return false;
    },

    async findCountryOne(id) {
        const err = (await this.valideCountry({},id,5));
        if (err) {
            return err;
        }
      const Country = await COUNTRY.findByPk(id);
        return Country;
    },

    async findAllCountry(){
        const Country = await COUNTRY.findAll({where : {}});
        return Country;
    },

    async CreateCountry(NewCountry) {
          const err = await this.valideCountry(NewCountry,0,1);
          if (err) {
              return err;
          }
          const Country = await COUNTRY.create(NewCountry);
          return Country;
    },

    async UpdateCountry(body, id) {
        const err = await this.valideCountry(body,id,2);
        if (err) {
            return err;
        }
        const Country = await COUNTRY.update(body , {where : { IdCountry : id}});
        return Country;
    },

    async DeleteCountry(id) {
        const err = await this.valideCountry({},id,3);
        if (err) {
            return err;
        }
      const Country = await COUNTRY.destroy({where : { IdCountry : id}});
        return Country;
    },

};  