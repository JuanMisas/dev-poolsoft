const Sequelize = require('sequelize');
const CT = require('../models/ps_poolcustomers');
const server = require('../server/server');
const { validate } = require('../server/connection');
const { INTEGER } = require('sequelize');
const Customer = require('../controllers/CustomerController');
const TypePool = require('../controllers/PoolTypeController');
const UMed = require('../controllers/unitedMeasuredController');
const TypeFilter = require('../controllers/FilterTypeController');

module.exports = {

    async valideCustomerPool(NP, id, tipo){
        var errores = [];
        var len1 = 0;
        if (tipo > 1) {
            var x1 = await CT.count({where : {'idPoolsCustomers' : id}});
            if (x1 == 0) 
                errores.push('El ID No existe');
        }
        if (tipo == 1 || tipo == 2){
            if (tipo == 1) {
                var x1 = await CT.count({where : {'idPoolsCustomers' : NP.idPoolsCustomers}});
                if (x1 > 0) 
                    errores.push('El ID ya existe');
            }    
            if (NP.idPoolsCustomers == undefined ){
                errores.push('El ID no puede ser nulo');
            }
            // Valide Que el cliente existe 
            if (NP.IdCustomer == '' || NP.IdCustomer == undefined ) {
                errores.push('El Cliente debe existir')
            }
            else{
                const cus = Customer.findCustomerOneById(NP.IdCustomer);
                len1 = cus.length;
                if (len1 > 0) {
                    errores.push('El cliente de no existe')
                }
            }
            //Validad la descripcion
            if (NP.DescriptionsPoolsCustomers == '' || NP.DescriptionsPoolsCustomers == undefined) {
                errores.push('La descripcion de la piscina no puede ser nulo');
            }

            // Valida el tipo de Piscina
            if (NP.TypePoolsCustomers == '' || NP.TypePoolsCustomers == undefined) {
                errores.push = 'El tipo de piscina debe existir'
            }
            else{
                const TP =  TypePool.findPoolTypeOne(NP.TypePoolsCustomers);
                len1 = TP.length;
                if (len1 > 0) {
                    errores.push('El tipo de piscina no existe')
                }
            }
            // Valida el Ancho
            if (NP.WidthPoolsCustomer == '' || NP.WidthPoolsCustomer == undefined){
                errores.push('El ancho de la piscina debe existir')
            }
            else{
                if (NP.WidthPoolsCustomer <= 0) {
                    errores.push('El ancho de la piscina debe ser mayor a cero')
                }
            }
            
            // Valida el Largo
            if (NP.LargePoolsCustomers == '' || NP.LargePoolsCustomers == undefined){
                errores.push('El largo de la piscina debe existir')
            }
            else{
                if (NP.LargePoolsCustomers <= 0) {
                    errores.push('El largo de la piscina debe ser mayor a cero')
                }
            }

            // Validad la profundidad min
            if (NP.DeepMinPoolsCustomers == '' || NP.DeepMinPoolsCustomers == undefined){
                errores.push('La profundidad minima de la piscina debe existir')
            }
            else{
                if (NP.DeepMinPoolsCustomers <= 0) {
                    errores.push('La profundiddad minima de la piscina debe ser mayor a cero')
                }
            }
            
            // Validad la profundad maxina
            if (NP.DeepMaxCustomers == '' || NP.DeepMaxCustomers == undefined){
                errores.push('La profundidad maxima de la piscina debe existir')
            }
            else{
                if (NP.DeepMaxCustomers <= 0) {
                    errores.push('La profundiddad maxima de la piscina debe ser mayor a cero')
                }
            }

            // Validad la unidad de medida de las medidas
            if (NP.UMPoolsCustomers == '' || NP.UMPoolsCustomers == undefined){
                errores.push('La unidad de medida del tamano de la piscina debe existir')
            }
            else{
                const UM = UMed.findUnitedMeasuredById(NP.UMPoolsCustomers);
                len1 = UM.length;
                if (len1 > 0){
                    errores.push('La unidad de medida del tamano de la piscina no existe')
                }
            }

            // Validad el volumen
            if (NP.CubicPoolsCustomers == '' || NP.CubicPoolsCustomers == undefined){
                errores.push('El volumen de la piscina debe existir')
            }
            else{
                if (NP.CubicPoolsCustomers <= 0) {
                    errores.push('El volumen de la piscina debe ser mayor a cero')
                }
            }

            // Valida la unidad de medidad del volumen
            if (NP.UMCubicPoolsCustomers == '' || NP.UMCubicPoolsCustomers == undefined){
                errores.push('La unidad de medida del valumen de la piscina debe existir')
            }
            else{
                const UM = UMed.findUnitedMeasuredById(NP.UMCubicPoolsCustomers);
                len1 = UM.length;
                if (len1 > 0){
                    errores.push('La unidad de medida del valumen de la piscina no existe')
                }
            }

            // Validad la forma de la piscina
            if (NP.FormPoolsCustomers == '' || NP.FormPoolsCustomers == undefined) {
                errores.push('La descripcion de la piscina no puede ser nulo');
            }

            // Validad el tipo de filtro
            if (NP.TypeFilterCustomers == '' || NP.TypeFilterCustomers == undefined){
                errores.push('El tipo de filtro debe existir')
            }
            else{
                const TF = TypeFilter.findFilterTypeOne(NP.TypeFilterCustomers);
                len1 = TF.length;
                if (len1 > 0){
                    errores.push('El tipo de filtro no existe')
                }
            }

            // Validad el numero de filtros
            if (NP.NumFilterPoolsCustomers == '' || NP.NumFilterPoolsCustomers == undefined){
                errores.push('El numero de Filtros debe existir')
            }
            else{
                if (NP.NumFilterPoolsCustomers <= 0) {
                    errores.push('El numero de Filtros debe ser mayor a cero')
                }
            }

            // Validad la frecuencia de la visitas
            if (NP.Frequencypoolscustomers == '' || NP.Frequencypoolscustomers == undefined){
                errores.push('La frecuencia de visitas debe existir')
            }
            else{
                if (NP.Frequencypoolscustomers <= 0) {
                    errores.push('La frecuencia de visitas debe ser mayor a cero')
                }
            }

            // Validad periodicidad (1= semanal, 2=bisemanal 3=mensual, 4=bimensual)
            if (NP.Frequencypoolscustomers == '' || NP.Frequencypoolscustomers == undefined){
                errores.push('La periodicidad de las visitas debe existir')
            }
            else{
                if (NP.Frequencypoolscustomers <= 0 || NP.Frequencypoolscustomers > 4) {
                    errores.push('La periodicidad no es valido')
                }
            }
        }
        const len = errores.length;
        if (len > 0 )
            return errores;
        else
            return false;
    },

    async findPoolCustomerOne(id) {
        const err = (await this.valideCustomerPool({},id,5));
        if (err) {
            return err;
        }
        const PoolCustomer = await CT.findByPk(id);
        return PoolCustomer;
    },

    async findAllPoolCustomer(){
        const PoolCustomer = await CT.findAll({where : {}});
        return PoolCustomer;
    },

    async CreatePoolCustomer(NewPoolCustomer) {
          const err = await this.valideCustomerPool(NewPoolCustomer,0,1);
          if (err) {
              return err;
          }
          const PoolCustomer = await CT.create(NewPoolCustomer);
          return PoolCustomer;
    },

    async UpdatePoolCustomer(body, id) {
        const err = await this.valideCustomerPool(body,id,2);
        if (err) {
            return err;
        }
        if (body.idPoolsCustomers == ''){
            body.idPoolsCustomers = id;
        }
        const PoolCustomer = await CT.update(body , {where : { idPoolsCustomers : id}});
        return PoolCustomer;
    },

    async DeletePoolCustomer(id) {
        const err = await this.valideCustomerPool({},id,3);
        if (err) {
            return err;
        }
      const PoolCustomer = await CT.destroy({where : { idPoolsCustomers : id}});
        return PoolCustomer;
    },

};  