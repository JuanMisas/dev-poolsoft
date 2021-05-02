const Sequelize = require('sequelize');
const FT = require('../models/ps_FilterType');
const server = require('../server/server');
const { validate } = require('../server/connection');
const { INTEGER } = require('sequelize');


module.exports = {

    async valideFilter(NF, id, tipo){
       var errores = [];
        if (tipo > 1) {
            var x1 = await FT.count({where : {'idFilterType' : id}});
            if (x1 == 0) 
                errores.push('El ID No existe');
        }
        if (tipo == 1 || tipo == 2){
            if (tipo == 1) {
                if (NF.idFilterType != undefined) {
                    var x1 = await FT.count({where : {'idFilterType' : NF.idFilterType}});
                    if (x1 > 0) 
                        errores.push('El ID ya existe');
                }
            }    
            if (NF.idFilterType == undefined && tipo != 1){
                errores.push('El ID no puede ser nulo');
            }
            if (NF.NameFilterType == '' || NF.NameFilterType == undefined) {
                errores.push('El Nombre no puede ser nulo');
            }
        }
        const len = errores.length;
        if (len > 0 )
            return errores;
        else
            return false;
    },

    async findFilterTypeOne(id) {
        const err = (await this.valideFilter({},id,5));
        if (err) {
            return err;
        }
      const FilterType = await FT.findByPk(id);
        return FilterType;
    },

    async findAllFilterType(){
        const FilterType = await FT.findAll({where : {}});
        return FilterType;
    },

    async CreateFilterType(NewFiltertype) {
          const err = await this.valideFilter(NewFiltertype,0,1);
          console.log(NewFiltertype);
          if (err) {
              return err;
          }
          const FilterType = await FT.create(NewFiltertype);
          return FilterType;
    },

    async UpdateFilterType(body, id) {
        const err = await this.valideFilter(body,id,2);
        if (err) {
            return err;
        }
        if (body.idFilterType == ''){
            body.idFilterType = id;
        }
        const FilterType = await FT.update(body , {where : { idFilterType : id}});
        return FilterType;
    },

    async DeleteFilterType(id) {
        const err = await this.valideFilter({},id,3);
        if (err) {
            return err;
        }
      const FilterType = await FT.destroy({where : { idFilterType : id}});
        return FilterType;
    },

};  